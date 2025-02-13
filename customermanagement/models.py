from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.core.storage_utils import ZFileField
from phonenumber_field.modelfields import PhoneNumberField
from zango.apps.dynamic_models.fields import ZForeignKey

from ..common.user_utils import UserHandlingMixin

class Customer(DynamicModelBase):
    customer_name = models.CharField(max_length=255, unique=True)
    type_of_business = models.CharField(max_length=16)
    center_code = models.CharField(max_length=6)
    email_id = models.CharField(max_length=64)
    contact_number = PhoneNumberField(max_length=255, blank=True)
    address = models.TextField()
    customer_logo = ZFileField(null=True, blank=True)

    def __str__(self):
        return self.customer_name


class CustomerAccount(DynamicModelBase, UserHandlingMixin):

    name = models.CharField(max_length=255)
    customer = ZForeignKey(Customer, on_delete=models.CASCADE)
    designation = models.CharField(max_length=255)
    email_id = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.customer}"



