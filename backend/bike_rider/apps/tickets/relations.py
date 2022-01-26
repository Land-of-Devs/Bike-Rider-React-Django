from django.template import RequestContext
from rest_framework import serializers
from bike_rider.apps.travels.models import Travel

class TravelsRelatedField(serializers.RelatedField):

    def get_queryset(self):
        return Travel.objects.filter(user_id=self.context['request'].user.id)
    
    def to_representation(self, value):
        return value.start