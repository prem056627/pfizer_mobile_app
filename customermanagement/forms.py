
from ..packages.crud.forms import BaseForm, BaseSimpleForm
from ..packages.crud.form_fields import ModelField
from django import forms
from .models import Customer, CustomerAccount

from ..common.user_utils import UserWorker


class CustomerForm(BaseForm):
    customer_name = ModelField(placeholder="Customer Name")
    type_of_business = ModelField(placeholder="Type of Business")
    center_code = ModelField(placeholder="Center Code")
    email_id = ModelField(placeholder="Email ID")
    contact_number = ModelField(placeholder="Contact Number")
    address = ModelField(placeholder="Address")
    customer_logo = ModelField(placeholder="Customer Logo")
    
    class Meta:
        model = Customer
        title = "Add New Customer"

        order = ['customer_name', 'type_of_business', 'center_code', 'email_id', 'contact_number', 'address', 'customer_logo']

    
class CustomerAccountForm(BaseForm):

    name = ModelField(placeholder="Name")
    customer = ModelField(placeholder="Customer")
    designation = ModelField(placeholder="Designation")
    email_id = ModelField(placeholder="Email ID")
    contact_number = ModelField(placeholder="Contact Number")


    class Meta:
        model = CustomerAccount
        title = "Add New Account"

        order = [
            'name',
            'customer',
            'designation',
            'email_id',
            'contact_number'
        ]

    def __init__(self, *args, **kwargs):
        super(CustomerAccountForm, self).__init__(*args, **kwargs)
        self.user_worker = UserWorker()
        instance = kwargs.get('instance')

        self.is_edit = True if instance else False
        print(self.fields)
        


    def clean(self, *args, **kwargs):
        
        super(CustomerAccountForm, self).clean(*args, **kwargs)

        validate = False
        if self.is_edit:
            if not self.instance.email_id == self.cleaned_data.get('email_id'):
                validate = True
        
        if validate:
            result = self.user_worker.validate_for_creation(email=self.cleaned_data.get('email_id'))

            if result[1] != 4:
                raise forms.ValidationError(result[0])

    def save(self, commit=True):

        instance = super(CustomerAccountForm, self).save(commit=True)

        role = 'Customer'

        if self.is_edit:
            result = self.user_worker.update_user({
                'name': instance.name,
                'email': instance.email_id,
                'mobile': None,
            }, instance.object_uuid, role)
        else:
            result = self.user_worker.create_user({
                'name': instance.name,
                'email': instance.email_id,
                'mobile': None,
                'password': "Zelthy@123",
                'app_object': str(instance.object_uuid)
            }, role, instance)

        return instance


