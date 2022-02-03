from django.conf import settings
from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import mixins, permissions, views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .serializers import CookieTokenRefreshSerializer, UserRegisterSerializer


class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [~permissions.IsAuthenticated]

    def finalize_response(self, request, response, *args, **kwargs):

        if response.data.get('access'):
            cookie_max_age = 3600 * 24 * 14  # 14 days
            response.set_cookie(
                settings.JWT_AUTH['JWT_AUTH_COOKIE'], response.data['access'], max_age=cookie_max_age, httponly=True)

        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14  # 14 days
            response.set_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'],
                                response.data['refresh'], max_age=cookie_max_age, httponly=True)
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14  # 14 days
            response.set_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'],
                                response.data['refresh'], max_age=cookie_max_age, httponly=True)
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class RegisterViewSet(mixins.CreateModelMixin, GenericViewSet):
    # must NOT (~) be authenticated
    permission_classes = [~permissions.IsAuthenticated]
    serializer_class = UserRegisterSerializer


class LogoutView(views.APIView):

    def post(self, request, *args, **kwargs):
        response = Response({'ok': True})
        response.delete_cookie(settings.JWT_AUTH['JWT_AUTH_COOKIE'])
        response.delete_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'])
        return response
