
from zango.core.utils import get_current_role

from ..packages.crud.base import BaseCrudView

from .forms import CustomerForm, CustomerAccountForm
from .models import Customer, CustomerAccount
from .tables import CustomerCrudTable, CustomerAccountCrudTable


from .workflow import CustomerWorkflow


class CustomerCrudView(BaseCrudView):
    page_title = "Customers"
    add_btn_title = "Add New Customer"
    table = CustomerCrudTable
    form = CustomerForm
    model = Customer
    
    workflow = CustomerWorkflow
    
    
    def display_add_button_check(self, request):
        return get_current_role().name in ['Medidict User']
    
    def can_perform_action_edit(self, request, obj):
        return get_current_role().name in ['Medidict User']



class CustomerAccountCrudView(BaseCrudView):
    page_title = "Customer Accounts"
    add_btn_title = "Add New Customer Account"
    table = CustomerAccountCrudTable
    form = CustomerAccountForm
    model = CustomerAccount
    
    
    def display_add_button_check(self, request):
        return get_current_role().name in ['Medidict User']
    
    def can_perform_action_edit(self, request, obj):
        return get_current_role().name in ['Medidict User']

