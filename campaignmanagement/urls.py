
from django.urls import path, include


from .views import CampaignCrudView,CampaignTemplateURLView



urlpatterns = [
    
    path('campaignmanagement/', CampaignCrudView.as_view(), name='CampaignCrudView'),
    path('campaign-url/', CampaignTemplateURLView.as_view(), name='campaign_url_template'),

    
]