from django.urls import path
from .views import BookingViewSet

urlpatterns = [
  path('bookings/', BookingViewSet.as_view({'get':'retrieve','post':'create','delete':'destroy'}))
]

