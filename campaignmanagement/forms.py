from django import forms
from ..packages.crud.forms import BaseForm, BaseSimpleForm
from ..packages.crud.form_fields import ModelField
from ..customermanagement.models import Customer
from .models import Campaign, CampaignCustomer
from django.db import transaction


class CampaignForm(BaseForm):
    campaign_name = ModelField(placeholder="Campaign Name")
    start_date = ModelField(placeholder="Start Date")
    end_date = ModelField(placeholder="End Date")
    # associated_url = ModelField(placeholder="Associated Url")
    customers = forms.ChoiceField(label="Customers")

    class Meta:
        model = Campaign
        title = "Launch New Campaign"
        order = ['campaign_name', 'start_date', 'end_date','customers']

    def __init__(self, *args, **kwargs):
        super(CampaignForm, self).__init__(*args, **kwargs)
        self.fields["customers"].choices = [(customer.id, customer.customer_name) for customer in Customer.objects.all()]

        instance = kwargs.get('instance')
        self.is_edit = True if instance else False

        if self.is_edit:
            self.Meta.title = "Update Campaign Details"
            self.fields["customers"].initial = [obj.customer.id for obj in CampaignCustomer.objects.filter(campaign=self.instance)]
        else:
            self.Meta.title = "Launch New Campaign"

    def save(self, commit=True):
        
        instance = super().save(commit=True)
        
        host = self.crud_view_instance.request.get_host()
        
        customer_ids = self.cleaned_data.get('customers')

        if self.is_edit:
            CampaignCustomer.objects.filter(campaign=instance).delete()

        campaign_customers = [CampaignCustomer(customer_id=cid, campaign=instance) for cid in customer_ids]
        CampaignCustomer.objects.bulk_create(campaign_customers)


        instance.associated_url = f"http://{host}/campaignmanagement/campaign-url/?campaign={instance.object_uuid}&customer_name={campaign_customers[0].customer.customer_name}&campaign_name={instance.campaign_name}"

        instance.save()  

        return instance


