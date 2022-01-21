from django.contrib import admin
from django.conf.urls import include, url
urlpatterns = [
    url('admin/', admin.site.urls),
    url('api/auth/', include('rest_framework.urls')),
    url('api/', include('bike_rider.apps.users.urls')),
    url('api/', include('bike_rider.apps.subscriptions.urls')),
    url('api/', include('bike_rider.apps.bookings.urls')),
    url('api/', include('bike_rider.apps.travels.urls')),
    url('api/', include('bike_rider.apps.bstations.urls')),
    url('api/', include('bike_rider.apps.bikes.urls')),
]
