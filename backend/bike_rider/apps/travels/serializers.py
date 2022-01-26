from rest_framework import serializers
from .models import Travel

class UserTravels(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = ['travels','client', 'status', 'created_at']
        read_only_fields = ['client']
