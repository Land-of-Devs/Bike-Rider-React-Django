from rest_framework import serializers
from .models import User

class ThumbnailSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(read_only=True)
    email = serializers.CharField()
    image = serializers.CharField(allow_blank=True, required=False)


    class Meta:
        model = User
        fields = ['dni', 'email', 'image']
        read_only_fields = ['dni',]