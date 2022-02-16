import json
from django.conf import settings
from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import mixins, views
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .serializers import CookieTokenRefreshSerializer, UserRegisterSerializer
from .backends import CookieJWTAuthentication
from .models import User
from .serializers import SessionSerializer
from urllib.parse import quote

class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = (~IsAuthenticated,)
    authentication_classes = (CookieJWTAuthentication,)

    def finalize_response(self, request, response, *args, **kwargs):

        origin = request.query_params.get('origin', None)

        if origin == 'station':
            cookie_max_age = 60 * 3 # 3 min
        else :
            cookie_max_age = 3600 * 24 * 14  # 14 days

        if response.data.get('access'):

            user = User.objects.get(dni=request.data['dni'])
            print(user)
            serializer = SessionSerializer(user)
            response.set_cookie(
                'bruser', quote(json.dumps(serializer.data)), max_age=cookie_max_age
            )
            response.set_cookie(
                settings.JWT_AUTH['JWT_AUTH_COOKIE'], response.data['access'], max_age=cookie_max_age, httponly=True)

        if response.data.get('refresh'):
            response.set_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'],
                                response.data['refresh'], max_age=cookie_max_age, httponly=True)
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (CookieJWTAuthentication,)
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        origin = request.query_params.get('origin', None)
        if origin == 'station':
            cookie_max_age = 60 * 5 # 5 min
        else:
            cookie_max_age = 3600 * 24 * 14  # 14 days

        if response.data.get('access'):
            user = User.objects.get(dni=request.user.dni)
            serializer = SessionSerializer(user)
            response.set_cookie(
                'bruser', quote(json.dumps(serializer.data)), max_age=cookie_max_age
            )
            response.set_cookie(
                settings.JWT_AUTH['JWT_AUTH_COOKIE'], response.data['access'], max_age=cookie_max_age, httponly=True)

        if response.data.get('refresh'):
            response.set_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'],
                                response.data['refresh'], max_age=cookie_max_age, httponly=True)
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class RegisterViewSet(mixins.CreateModelMixin, GenericViewSet):
    # must NOT (~) be authenticated
    permission_classes = (~IsAuthenticated,)
    serializer_class = UserRegisterSerializer


class LogoutView(views.APIView):

    def post(self, request, *args, **kwargs):
        response = Response({'ok': True})
        response.delete_cookie(settings.JWT_AUTH['JWT_AUTH_COOKIE'])
        response.delete_cookie(settings.JWT_AUTH['JWT_REFRESH_COOKIE'])
        response.delete_cookie('bruser')
        return response
