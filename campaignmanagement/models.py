from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey, ZOneToOneField

from ..customermanagement.models import Customer

class Campaign(DynamicModelBase):

    campaign_name = models.CharField(max_length=255, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    associated_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.campaign_name


class CampaignCustomer(DynamicModelBase):
    campaign = ZForeignKey(Campaign, on_delete=models.CASCADE)
    customer = ZForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.campaign} - {self.customer}"


