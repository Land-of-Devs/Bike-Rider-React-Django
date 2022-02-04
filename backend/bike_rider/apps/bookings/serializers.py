from rest_framework import serializers
from datetime import timedelta, datetime
from bike_rider.apps.bstations.models import BStation
from .models import Booking
from .relations import StationRelatedField
from bike_rider.apps.users.serializers import ThumbnailSerializer

class BookingSerializer(serializers.ModelSerializer):
    station = StationRelatedField(read_only=True)
    time_start = serializers.DateTimeField(read_only=True)
    time_end = serializers.DateTimeField(read_only=True)
    user = ThumbnailSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
    def reservation(self, data, context):
        sid = data['station']
        s = BStation.objects.get(id=sid)
        time_end = datetime.today() + timedelta(minutes=5)
        return Booking.objects.create(
          time_start=datetime.today(), 
          time_end=time_end, 
          user=context['user'], 
          station=s
        )


class BookingBStationSerializer(BookingSerializer):

    class Meta:
        model = Booking
        fields = ['id', 'time_end']
