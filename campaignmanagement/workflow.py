
from ..packages.workflow.base.engine import WorkflowBase

class CampaignWorkflow(WorkflowBase):

    status_transitions = [
        
        {
            "name": "activate",
            "display_name": "Activate",
            "description": "Activate Campaign",
            "from": "inactive",
            "to": "active",
            
            "confirmation_message": "Activate campaign?"
        },
        
        {
            "name": "deactivate",
            "display_name": "Deactivate",
            "description": "Deactivate Campaign",
            "from": "active",
            "to": "inactive",
            
            "confirmation_message": "Deactivate campaign?"
        },
        
    ]

    tag_transitions = [
        
    ]

    class Meta:
        on_create_status = "active"
        statuses = {
            
            "active": {
                "color": "green",
                "label": "Active"
            },
            
            "inactive": {
                "color": "red",
                "label": "Inactive"
            },
            
        }

        tags = [
            
        ]



