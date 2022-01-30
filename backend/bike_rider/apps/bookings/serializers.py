from rest_framework import serializers
from .models import BStation
from .models import Booking

#from bike_rider.apps.core.utils import MaintenancePrivateField

class BookingBStationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ['id', 'time_end']
