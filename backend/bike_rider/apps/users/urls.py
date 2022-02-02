from django.urls import path
from .views import CookieTokenRefreshView, CookieTokenObtainPairView 

urlpatterns = [
    path('auth/login/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),

]