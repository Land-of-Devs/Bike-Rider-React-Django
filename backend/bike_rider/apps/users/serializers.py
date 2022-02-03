from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
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
    email = serializers.CharField()
    image = serializers.CharField(allow_blank=True, required=False)


    class Meta:
        model = User
        fields = ['dni', 'email', 'image']
        read_only_fields = ['dni',]

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['dni', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(
            dni=validated_data['dni'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user
