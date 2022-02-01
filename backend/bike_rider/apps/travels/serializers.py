from rest_framework import serializers
from .models import Travel

class UserTravels(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = ['bike_id', 'start']
        read_only_fields = ['bike_id', 'start']
        depth = 0
