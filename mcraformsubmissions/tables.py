
from zango.core.utils import get_current_role

from ..packages.crud.table.column import ModelCol

from ..campaignmanagement.models import CampaignCustomer
from .models import FormSubmission
from .forms import FormSubmissionForm

from ..common.table_utils import CustomModelTable

class FormSubmissionCrudTable(CustomModelTable):
    submission_date_time = ModelCol(display_as="Submission Date Time", searchable=True, sortable=True)
    name_of_submitter = ModelCol(display_as="Name Of Submitter", searchable=True, sortable=True)
    associated_report = ModelCol(display_as="Report", searchable=True, sortable=True)
    answers_report = ModelCol(display_as="Submission", searchable=True, sortable=True)
    campaign = ModelCol(display_as="Campaign", searchable=True, sortable=True)

    table_actions = [
    ]

    row_actions = [
        # {
        #     "name": "Edit",
        #     "key": "edit",
        #     "description": "Edit",
        #     "type": "form",
        #     "form": FormSubmissionForm,
        # }
    ]

    class Meta:
        model = FormSubmission
        fields = ['submission_date_time', 'name_of_submitter', 'associated_report', 'campaign', 'answers_report']
        row_selector = {}

    def get_table_data_queryset(self):
        queryset = super().get_table_data_queryset()
        user_role = get_current_role()
        if user_role.name == 'Customer':
            obj = self.crud_view_instance.request.user.get_app_object(user_role.id)
            campigns = CampaignCustomer.objects.filter(customer=obj.customer.id).values('campaign')
            queryset = queryset.filter(campaign__in=campigns)


        return queryset

    # def get_table_data_queryset(self):
    #     queryset = super().get_table_data_queryset()
    #     request = get_current_request()

    #     customer_filter = request.GET.get('customer')
    #     date_filter = request.GET.get('date')
    #     time_filter = request.GET.get('time')

    #     if customer_filter:
    #         queryset = queryset.filter(customer__customer_name__icontains=customer_filter)
    #     if date_filter:
    #         queryset = queryset.filter(submission_date_time__date=date_filter)
    #     if time_filter:
    #         queryset = queryset.filter(submission_date_time__time=time_filter)

    #     return queryset


