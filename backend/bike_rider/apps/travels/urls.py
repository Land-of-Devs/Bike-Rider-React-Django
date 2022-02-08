from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserTravelsViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'my-travels', UserTravelsViewSet ,  basename='MyTravels')
urlpatterns = [
    path('travels/', include(router.urls))
]