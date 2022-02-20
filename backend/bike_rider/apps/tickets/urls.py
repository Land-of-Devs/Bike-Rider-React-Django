from .views import StaffListTicketViewSet, UserSendTicketViewSet, ChangeTicketStatusViewSet, SendTicketEmailViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'list', StaffListTicketViewSet, basename='StaffListTicket')
router.register(r'user', UserSendTicketViewSet, basename='UserSendTicket')
router.register(r'status', ChangeTicketStatusViewSet, basename='ChageTicketStatus')

urlpatterns = [
    path('tickets/', include(router.urls)),
    path('tickets/email/',SendTicketEmailViewSet.as_view(), name='SendTicketEmail')
]
