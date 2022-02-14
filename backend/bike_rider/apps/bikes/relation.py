from rest_framework import serializers

class TicketRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        from bike_rider.apps.tickets.serializers import TicketMaintenanceSerializer
        return TicketMaintenanceSerializer(value).data

