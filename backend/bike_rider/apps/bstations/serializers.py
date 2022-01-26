from rest_framework import serializers
from .models import BStation

class BStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BStation
        fields = ['name', 'lat', 'lon', 'image', 'nslots']

class BStationDistSerializer(serializers.ModelSerializer):
    approx_dist = serializers.FloatField()
    dist = serializers.FloatField()

    class Meta:
        model = BStation
        fields = ['name', 'lat', 'lon', 'image', 'nslots', 'approx_dist', 'dist']
