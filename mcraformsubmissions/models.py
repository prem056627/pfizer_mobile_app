from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey
from ..campaignmanagement.models import Campaign
from zango.core.storage_utils import ZFileField
from datetime import datetime
from uuid import uuid4

class FormSubmission(DynamicModelBase):

    def custom_individual_upload_to(instance, filename):
        ext = filename.split('.')[-1]  # Get the file extension
        today = datetime.today().strftime('%d %b %Y')
        return f"Individual_report__{instance.campaign.campaign_name}_{instance.name_of_submitter}_{uuid4()}_{today}.{ext}"

    def custom_answer_upload_to(instance, filename):
        ext = filename.split('.')[-1]  # Get the file extension
        today = datetime.today().strftime('%d %b %Y')
        return f"Answer_report__{instance.campaign.campaign_name}_{instance.name_of_submitter}_{uuid4()}_{today}.{ext}"

    submission_date_time = models.DateTimeField()
    name_of_submitter = models.CharField(max_length=255)
    associated_report = ZFileField(null=True, blank=True, upload_to=custom_individual_upload_to)
    campaign = ZForeignKey(Campaign, on_delete=models.CASCADE)
    form_data = models.JSONField(default=dict)
    risk_score = models.JSONField(default=dict)
    category_scores = models.JSONField(default=dict)
    personal_details = models.JSONField(default=dict)
    meta_details = models.JSONField(default=dict)
    answers_report = ZFileField(null=True, blank=True, upload_to=custom_answer_upload_to)

    def __str__(self):
        return f"{self.name_of_submitter} - {self.submission_date_time.date()}"