from rest_framework import serializers
from datetime import timedelta, datetime
from .models import BStation
from .models import Booking
from pprint import pprint

#from bike_rider.apps.core.utils import MaintenancePrivateField

class BookingSerializer(serializers.ModelSerializer):
    station = serializers.IntegerField()
    time_start = serializers.DateTimeField(read_only=True)
    time_end = serializers.DateTimeField(read_only=True)
    user = serializers.IntegerField(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'

    def reservation(self, context):
        sid = self.validated_data['station']
        s = BStation.objects.get(id=sid)
        time_end = datetime.today() + timedelta(minutes=5)
        return Booking.objects.create(
          time_start=datetime.today(), 
          time_end=time_end, 
          user=context['user'], 
          station=s
        )

    def cancel(self, instance):
        instance.delete()


class BookingBStationSerializer(BookingSerializer):

    class Meta:
        model = Booking
        fields = ['id', 'time_end']
