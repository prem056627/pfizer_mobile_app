
from ..packages.crud.forms import BaseForm, BaseSimpleForm
from ..packages.crud.form_fields import ModelField
from django import forms
from .models import FormSubmission
class FormSubmissionForm(BaseForm):
    submission_date_time = ModelField(placeholder="Submission Date Time")
    name_of_submitter = ModelField(placeholder="Name Of Submitter")
    associated_report = ModelField(placeholder="Associated Report")
    campaign = ModelField(placeholder="Campaign")

    class Meta:
        model = FormSubmission
        title = "Submit a New Form"

        order = ['submission_date_time', 'name_of_submitter', 'associated_report', 'campaign']

