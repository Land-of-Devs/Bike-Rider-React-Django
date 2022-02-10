from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import get_user_model
from .models import User

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')


class ThumbnailSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(read_only=True)
    email = serializers.CharField(read_only=True)
    image = serializers.CharField(allow_blank=True, required=False)


    class Meta:
        model = User
        fields = ['dni', 'email', 'image']
        read_only_fields = ['dni',]


class SessionSerializer(ThumbnailSerializer):
    role = serializers.CharField(read_only=True)
    subscription = None

    class Meta:
        model = User
        fields = ['role', 'subscription', 'dni', 'email', 'image']

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['dni', 'email', 'password']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            validated_data['dni'],
            validated_data['email'],
            validated_data['password']
        )

        return user
