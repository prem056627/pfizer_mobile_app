
from zango.core.utils import get_current_request, get_current_role

from ..packages.crud.table.column import ModelCol, StringCol

from .models import Customer, CustomerAccount
from .forms import CustomerForm, CustomerAccountForm

from ..common.table_utils import CustomModelTable, TableQuerySetMixin


class CustomerAccountCrudTable(CustomModelTable):

    name = ModelCol(display_as="Name")
    customer = ModelCol(display_as="Customer")
    designation = ModelCol(display_as="Designation")
    email_id = ModelCol(display_as="Email ID")
    contact_number = ModelCol(display_as="Contact Number")

    table_actions = [
    ]

    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Customer Account",
            "type": "form",
            "form": CustomerAccountForm,
        }
    ]

    class Meta:
        model = CustomerAccount
        fields = [
            'name',
            'customer',
            'designation',
            'email_id',
            'contact_number'
        ]
        row_selector = {}

    def __init__(self, request=None, **kwargs):
        self.customer.choices = [(x[0], x[1]) for x in set(list(CustomerAccount.objects.all().values_list('customer__id', 'customer__customer_name')))]
        super().__init__(request, **kwargs)


class CustomerCrudTable(TableQuerySetMixin, CustomModelTable):
    customer_name = ModelCol(display_as="Customer Name", searchable=True, sortable=True)
    type_of_business = ModelCol(display_as="Type of Business", searchable=True, sortable=True)
    center_code = ModelCol(display_as="Center Code", searchable=True, sortable=True)
    email_id = ModelCol(display_as="Email ID", searchable=True, sortable=True)
    contact_number = ModelCol(display_as="Contact Number", searchable=True, sortable=True)
    address = ModelCol(display_as="Address", searchable=True, sortable=True)
    customer_logo = ModelCol(display_as="Customer Logo", searchable=True, sortable=True)
    updated_state = StringCol(display_as="Status", sortable=True)

    table_actions = [
    ]

    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Customer",
            "type": "form",
            "form": CustomerForm,
        }
    ]

    class Meta:
        model = Customer
        fields = [ 'customer_name', 'type_of_business', 'center_code', 'email_id', 'contact_number', 'address', 'customer_logo']
        row_selector = {}

    def get_table_data_queryset(self):
        queryset = super().get_table_data_queryset()

        current_request = get_current_request()
        status_filter = current_request.GET.get('status', None)
        if status_filter:
            if status_filter.lower() == 'active':
                return queryset.filter(is_active=True)
            elif status_filter.lower() == 'inactive':
                return queryset.filter(is_active=False)
        return queryset


