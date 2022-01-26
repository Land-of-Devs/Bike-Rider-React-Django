from rest_framework import serializers
from bike_rider.apps.users.serializers import ThumbnailSerializer
from bike_rider.apps.bikes.serializers import BikeSerializer
from bike_rider.apps.bstations.serializers import BStationSerializer
from .relations import TravelsRelatedField
from .models import Ticket, SupportTicket, MaintenanceTicket

class TicketSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    client = ThumbnailSerializer(read_only=True)
    status = serializers.ChoiceField(Ticket.TYPE_TICKETS)
    created_at = serializers.SerializerMethodField(method_name='get_created_at')

    class Meta:
        model = Ticket
        fields = ['title','client', 'status', 'created_at']
        read_only_fields = ['client']
    
    def get_created_at(self, instance):
        return instance.created_at.isoformat()

class TicketSupportSerializer(serializers.ModelSerializer):
    head = TicketSerializer()
    type = serializers.ChoiceField(SupportTicket.TYPE_SUBJECTS)
    message = serializers.CharField()
    class Meta:
        model = SupportTicket
        fields = ['head', 'type', 'message']

class TicketMaintenanceSerializer(serializers.ModelSerializer):
    head = TicketSerializer()
    type = serializers.ChoiceField(MaintenanceTicket.TYPE_OBJECT)
    bike_r = BikeSerializer(read_only=True)
    bike_w = TravelsRelatedField(write_only=True)
    station_r = BStationSerializer(read_only=True)
    message = serializers.CharField()
    
    class Meta:
        model = MaintenanceTicket
        fields = ['head', 'type', 'bike_r','bike_w','station_r', 'message']
        read_only_fields = ['bike_r','station_r']
        write_only_fields = ['bike_w']
