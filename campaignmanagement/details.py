
from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol

class CampaignDetail(BaseDetail):
    campaign_name = ModelCol(display_as="Campaign Name")
    start_date = ModelCol(display_as="Start Date")
    end_date = ModelCol(display_as="End Date")
    associated_url = ModelCol(display_as="Associated Url")

    class Meta:
        fields = ['campaign_name', 'start_date', 'end_date', 'associated_url']

