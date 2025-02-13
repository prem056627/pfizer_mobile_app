from django.urls import path
from .views import FormSubmissionAPIView,\
    RiskExposureAPIView,\
        GroupRiskExposureAPIView,\
            GenerateIndividualReportPDF,\
                GenerateGroupReportPDF,\
                    FormSubmissionCrudView

urlpatterns = [
    path('mcraformsubmissions/', FormSubmissionCrudView.as_view(), name='FormSubmissionCrudView'),
    path('api/submit/', FormSubmissionAPIView.as_view(), name='form_submission_api'),
    path('api/risk-exposure/', RiskExposureAPIView.as_view(), name='risk-exposure'),
    path('api/group-risk-exposure/', GroupRiskExposureAPIView.as_view(), name='group-risk-exposure'),
    path('api/generate-individual-pdf/',GenerateIndividualReportPDF.as_view(),name='generate-individual-pdf'),
    path('api/generate-group-pdf/',GenerateGroupReportPDF.as_view(),name='generate-individual-pdf'),

]