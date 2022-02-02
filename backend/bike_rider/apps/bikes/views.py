from django.shortcuts import render
from rest_framework import mixins, viewsets, status
from rest_framework.views import Response
from .serializers import BikeHookSerializer
from pprint import pprint
from .models import Bike
from bike_rider.apps.core.permissions import IsStation
from rest_framework.permissions import IsAuthenticated

class BikeHookViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = BikeHookSerializer
    queryset = Bike.objects.all()
    permission_classes = [IsStation, IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user,
            'station': request.station
        }
        bike = self.get_object()
        serializer = self.serializer_class()
        hook = request.path.startswith("/api/bikes/hook/")
        pprint(request.user)

        if hook:
            serializer.hook(bike, serializer_context)
        else:
            serializer.unhook(bike, serializer_context)

        return Response({"status": "The bike was " + ("hooked" if hook else "unhooked")}, status=status.HTTP_200_OK)
