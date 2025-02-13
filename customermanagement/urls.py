
from django.urls import path, include


from .views import CustomerCrudView, CustomerAccountCrudView

urlpatterns = [
    
    path('customermanagement/', CustomerCrudView.as_view()),
    path('customeracc/', CustomerAccountCrudView.as_view())
    
]