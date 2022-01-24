from rest_framework import serializers
from .models import BStation

class BStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BStation
        fields = ['name', 'lat', 'lon', 'image', 'nslots']
