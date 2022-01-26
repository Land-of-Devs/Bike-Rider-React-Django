from .views import MaintenanceTicketViewSet, SupportTicketViewSet
from django.conf.urls import url

urlpatterns = [
    url(r'support', SupportTicketViewSet.as_view({
        'post': 'create',
        'get': 'list'
    })),
    url('maintenance', MaintenanceTicketViewSet.as_view({
        'post': 'create',
        'get': 'list'
    }))
]