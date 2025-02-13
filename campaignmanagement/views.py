
from zango.core.utils import get_current_role

from ..packages.crud.base import BaseCrudView

from .forms import CampaignForm
from .models import Campaign, CampaignCustomer
from .tables import CampaignCrudTable


from .workflow import CampaignWorkflow

from django.views import View
from django.shortcuts import get_object_or_404,redirect
from django.views.generic import TemplateView
from django.http import JsonResponse
import uuid


class CampaignCrudView(BaseCrudView):
    page_title = "Campaigns"
    add_btn_title = "Create New Campaign"
    table = CampaignCrudTable
    form = CampaignForm
    model = Campaign
    detail_template = 'campaign_detail.html'
    
    workflow = CampaignWorkflow
    
    
    def display_add_button_check(self, request):
        return get_current_role().name in ['Medidict User']
    
    def can_perform_action_edit(self, request, obj):
        return get_current_role().name in ['Medidict User']

    def get_context_data(self, **kwargs):
        
        context = super().get_context_data(**kwargs)
        view = self.get_request_view()
        if view == "detail":
            pk = self.request.GET.get("pk")
            obj = Campaign.objects.get(id=pk)
            customer = CampaignCustomer.objects.filter(campaign=obj).first()
            
            context['object_uuid'] = obj.object_uuid
            context['object_name'] = obj.campaign_name
            context['customer_name'] = customer.customer.customer_name

        return context
    
    # def form_valid(self,form):
    #     form.request = self.request
    #     isinstance=form.save()
    #     return redirect('campaign_url_template',campaign_id=instance.id)
    

    


class CampaignTemplateURLView(TemplateView):

    template_name="generate_url.html"
    

