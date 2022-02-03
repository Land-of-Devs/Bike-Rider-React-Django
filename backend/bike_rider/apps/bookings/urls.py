from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .views import BookingViewSet

#from .views import 

router = DefaultRouter(trailing_slash=False)
router.register(r'', BookingViewSet, basename='StBooking')

urlpatterns = [
  path('bookings/', include(router.urls))
]

