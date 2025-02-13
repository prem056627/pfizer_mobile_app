
from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol

class FormSubmissionDetail(BaseDetail):
    submission_date_time = ModelCol(display_as="Submission Date Time")
    name_of_submitter = ModelCol(display_as="Name Of Submitter")
    associated_report = ModelCol(display_as="Associated Report")
    customer = ModelCol(display_as="Customer")

    class Meta:
        fields = ['submission_date_time', 'name_of_submitter', 'associated_report', 'customer']

