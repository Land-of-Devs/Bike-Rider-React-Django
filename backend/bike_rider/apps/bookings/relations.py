from rest_framework import serializers

class StationRelatedField(serializers.RelatedField):
    
    def to_representation(self, value):
        from bike_rider.apps.bstations.serializers import BStationSerializer
        return BStationSerializer(value).data
