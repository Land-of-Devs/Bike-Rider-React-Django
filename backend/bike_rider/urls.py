from django.contrib import admin
from django.contrib.auth import views
from django.conf.urls import include, url
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from bike_rider.apps.bstations.views import BStationViewSet

urlpatterns = [
    url('admin/', admin.site.urls),
    url('api/auth/login/', obtain_jwt_token),
#    url('api/auth/logout/', views.LogoutView.as_view(), name='logout'),
    url('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url('api/', include('bike_rider.apps.users.urls')),
    url('api/', include('bike_rider.apps.subscriptions.urls')),
    url('api/', include('bike_rider.apps.bookings.urls')),
    url('api/', include('bike_rider.apps.travels.urls')),
    url('api/', include('bike_rider.apps.bstations.urls')),
    url('api/', include('bike_rider.apps.bikes.urls')),
]
