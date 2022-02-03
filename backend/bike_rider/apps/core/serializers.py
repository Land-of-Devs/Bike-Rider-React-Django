from django.http import JsonResponse
from rest_framework import serializers
from bike_rider.apps.core.threads import queue_message
from django.conf import settings

class EmailSerializer(serializers.Serializer):
    receiver = serializers.EmailField()
    subject = serializers.CharField(max_length=100, min_length=5)
    message = serializers.CharField(max_length=400, min_length=25)

    def send(self):
        queue_message((
            self.validated_data['subject'],
            self.validated_data['message'],
            settings.EMAIL_HOST_USER,
            [self.validated_data['receiver']],
        ))

