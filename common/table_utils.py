from django.db.models import Q
from django.db.models import Subquery, OuterRef, Max, Case, When, Value, CharField

from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import StringCol

from ..packages.workflow.base.models import WorkflowTransaction

class TableQuerySetMixin:

    def get_table_data_queryset(self):

        try:
            if self.crud_view_instance.workflow:
                self.status_mapping = self.crud_view_instance.workflow.Meta.statuses
        except:
            self.status_mapping = self.crud_view_instance.status_mapping


        # Subquery to get the latest created_at for each obj_uuid
        latest_created_ats = (
            WorkflowTransaction.objects.filter(transition_type="status", obj_uuid=OuterRef("object_uuid"))
            .values("obj_uuid")
            .annotate(latest_created_at=Max("created_at"))
            .values("latest_created_at")[:1]
        )

        # Query to fetch the latest state for each object_uuid in appointments table with status replacement
        objects = (
            self.model.objects.all()
            .annotate(latest_created_at=Subquery(latest_created_ats))
            .annotate(
                latest_state=Subquery(
                    WorkflowTransaction.objects.filter(
                        obj_uuid=OuterRef("object_uuid"),
                        created_at=OuterRef("latest_created_at"),
                    ).values("to_state")[:1]
                )
            )
            .annotate(
                updated_state=Case(
                    *[
                        When(latest_state=key, then=Value(value['label']))
                        for key, value in self.status_mapping.items()
                    ],
                    default=Value("Unknown"),
                    output_field=CharField()
                )
            )
        )

        return objects

    def updated_state_getval(self, obj):

        try:
            if self.crud_view_instance.workflow:
                color = self.crud_view_instance.workflow.Meta.statuses.get(obj.latest_state, {}).get('color')
            else:
                color = self.crud_view_instance.status_mapping[obj.latest_state]['color']
            
        except:
            if obj.updated_state == "Active":
                color = "green"
            else:
                color = "#EC6356"

        return f'<span style="background-color: {color};padding:8px;" class="badge badge-pill badge-primary">{obj.updated_state}</span>'


class CustomModelTable(ModelTable):
    id = StringCol(display_as="ID", searchable=True, sortable=True)

    def id_getval(self, obj):
        """
        Returns the formatted ID for display.
        """
        return obj.id + 10000

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) - 10000  # Reverse the ID modification
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id) |  Q(id=int(search_term))
        return Q()