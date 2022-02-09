from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bike_rider.apps.users.urls')),
    path('api/', include('bike_rider.apps.subscriptions.urls')),
    path('api/', include('bike_rider.apps.bookings.urls')),
    path('api/', include('bike_rider.apps.travels.urls')),
    path('api/', include('bike_rider.apps.bstations.urls')),
    path('api/', include('bike_rider.apps.bikes.urls')),
    path('api/', include('bike_rider.apps.tickets.urls')),
    path('api/', include('bike_rider.apps.coupons.urls')),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
]
