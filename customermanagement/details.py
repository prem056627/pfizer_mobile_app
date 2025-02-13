
from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol

class CustomerDetail(BaseDetail):
    customer_name = ModelCol(display_as="Customer Name")
    type_of_business = ModelCol(display_as="Type of Business")
    center_code = ModelCol(display_as="Center Code")
    email_id = ModelCol(display_as="Email ID")
    contact_number = ModelCol(display_as="Contact Number")
    address = ModelCol(display_as="Address")
    customer_logo = ModelCol(display_as="Customer Logo")

    class Meta:
        fields = [ 'customer_name', 'type_of_business', 'center_code', 'email_id', 'contact_number', 'address', 'customer_logo']

