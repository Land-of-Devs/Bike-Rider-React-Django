from rest_framework import serializers
from bike_rider.apps.users.serializers import ThumbnailSerializer
from bike_rider.apps.bikes.serializers import BikeSerializer
from bike_rider.apps.bstations.serializers import BStationSerializer
from .models import Ticket, SupportTicket, MaintenanceTicket
from bike_rider.apps.bikes.models import Bike
from bike_rider.apps.bstations.models import BStation

class TicketSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    client = ThumbnailSerializer(read_only=True)
    type = serializers.ChoiceField(Ticket.TYPE_TICKETS)
    status = serializers.ChoiceField(Ticket.STATUS_TICKETS, read_only=True)
    created_at = serializers.SerializerMethodField(method_name='get_created_at')

    class Meta:
        model = Ticket
        fields = ['id', 'title','client','type', 'status', 'created_at']
        read_only_fields = ['client', 'status']

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

class TicketStatusSerializer(TicketSerializer):
    status = serializers.ChoiceField(Ticket.STATUS_TICKETS)

    class Meta:
        model = Ticket
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status')
        instance.save()
        return instance

class TicketSupportSerializer(serializers.ModelSerializer):
    ticket_head = TicketSerializer()
    type = serializers.ChoiceField(SupportTicket.TYPE_SUBJECTS)
    message = serializers.CharField()
    class Meta:
        model = SupportTicket
        fields = ['ticket_head', 'type', 'message']

    def create(self, validated_data):
        head_data = validated_data.pop('ticket_head')
        head_model = Ticket.objects.create(client=self.context['client'], **head_data)
        return SupportTicket.objects.create(ticket_head=head_model, **validated_data)

class TicketMaintenanceSerializer(serializers.ModelSerializer):
    ticket_head = TicketSerializer()
    type = serializers.ChoiceField(MaintenanceTicket.TYPE_OBJECT)
    bike_id = BikeSerializer(read_only=True)
    station_id = BStationSerializer(read_only=True)
    message = serializers.CharField()

    class Meta:
        model = MaintenanceTicket
        fields = ['ticket_head', 'type' ,'bike_id','station_id', 'message']
        read_only_fields = ['bike','station']

    def create(self, validated_data):
        head_data = validated_data.pop('ticket_head')
        head_model = Ticket.objects.create(client=self.context['client'], **head_data)
        if(validated_data['type'] == 'BIKES'):
            bike = Bike.objects.get(id=self.context['bike'])
            return MaintenanceTicket.objects.create(
                ticket_head=head_model,
                bike_id=bike,
                **validated_data
            )
        else:
            station = BStation.objects.get(id=self.context['station'])
            return MaintenanceTicket.objects.create(
                ticket_head=head_model,
                station_id=station,
                **validated_data
            )

class TicketMaintenanceLightSerializer(TicketMaintenanceSerializer):
    bike_id = BikeSerializer(read_only=True)

    class Meta:
        model = MaintenanceTicket
        fields = ['ticket_head', 'type', 'bike_id', 'message']
