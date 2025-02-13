
import datetime

from zango.core.utils import get_current_role
from zango.apps.shared.tenancy.templatetags.zstatic import zstatic

from django.db.models import Q

from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import ModelCol, StringCol

from .models import Campaign, CampaignCustomer
from .forms import CampaignForm


from ..common.table_utils import CustomModelTable, TableQuerySetMixin

class CampaignCrudTable(TableQuerySetMixin, CustomModelTable):
    campaign_name = ModelCol(display_as="Campaign Name", searchable=True, sortable=True)
    start_date = ModelCol(display_as="Start Date", searchable=True, sortable=True)
    end_date = ModelCol(display_as="End Date", searchable=True, sortable=True)
    associated_url = ModelCol(display_as="Form Link")
    customers = StringCol(display_as="Customers", searchable=True, sortable=True)
    updated_state = StringCol(display_as="Status", sortable=True)
    form_pdf = StringCol(display_as="Form PDF", searchable=False, sortable=False)

    table_actions = [
    ]

    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit",
            "type": "form",
            "form": CampaignForm
        }
    ]

    class Meta:
        model = Campaign
        fields = ['campaign_name', 'start_date', 'end_date', 'associated_url']
        row_selector = {}

    def get_table_data_queryset(self):
        queryset = super().get_table_data_queryset()
        user_role = get_current_role()
        if user_role.name == 'Customer':
            obj = self.crud_view_instance.request.user.get_app_object(user_role.id)
            campigns = CampaignCustomer.objects.filter(customer=obj.customer.id).values_list('campaign_id')
            queryset = queryset.filter(id__in=campigns)


        return queryset

    
    def form_pdf_getval(self, obj):

        pdf_file = zstatic(
                        {"request": self.request}, "MCRA FORM.pdf"
                    )

        return f"<button style='text-decoration: underline;' href='#' onclick='window.open(\"{pdf_file}\", \"_blank\")'>View Form</button>"

    def customers_getval(self, obj):
        customers = []
        for inst in obj.campaigncustomer_set.all():
            customers.append(inst.customer.customer_name)
        return ",".join(customers)

    def associated_url_getval(self, obj):
        return f"<button style='text-decoration: underline;' href='#' onclick='window.open(\"{obj.associated_url}\", \"_blank\")'>View Form</button>"

    def customers_Q_obj(self, search_term):
        return Q(campaigncustomer__customer__customer_name__icontains=search_term)

    # def report_getval(self, obj):
    #     return f"<a target='_blank' href='/mcraformsubmissions/api/generate-group-pdf/?campaign_uuid={obj.object_uuid}'>Link</a>"


