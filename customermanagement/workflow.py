
from ..packages.workflow.base.engine import WorkflowBase







class CustomerWorkflow(WorkflowBase):

    status_transitions = [
        
        {
            "name": "activate",
            "display_name": "Activate",
            "description": "Activate Customer",
            "from": "inactive",
            "to": "active",
            
            "confirmation_message": "Activate customer?"
        },
        
        {
            "name": "deactivate",
            "display_name": "Deactivate",
            "description": "Deactivate Customer",
            "from": "active",
            "to": "inactive",
            
            "confirmation_message": "Deactivate customer?"
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



