from .views import StaffListTicketViewSet, UserSendTicketViewSet
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'list', StaffListTicketViewSet, basename='StaffListTicket')  
router.register(r'user', UserSendTicketViewSet, basename='UserSendTicket')
urlpatterns = [
    url(r'tickets/', include(router.urls))
]