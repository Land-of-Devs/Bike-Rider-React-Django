from django.contrib import admin
# from django.contrib.auth import views
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view()),
    # path('api/auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include('bike_rider.apps.users.urls')),
    path('api/', include('bike_rider.apps.subscriptions.urls')),
    path('api/', include('bike_rider.apps.bookings.urls')),
    path('api/', include('bike_rider.apps.travels.urls')),
    path('api/', include('bike_rider.apps.bstations.urls')),
    path('api/', include('bike_rider.apps.bikes.urls')),
    path('api/', include('bike_rider.apps.tickets.urls')),
]
