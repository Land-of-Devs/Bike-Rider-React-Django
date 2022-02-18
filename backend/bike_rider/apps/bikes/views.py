from django.shortcuts import render
from rest_framework import mixins, viewsets, status
from rest_framework.views import Response
from .serializers import BikeHookSerializer, BikeStatusSerializer, BikeStationMaintainerSerializer
from pprint import pprint
from .models import Bike
from .permissions import IsMaintainerBike, NotActiveTravels
from bike_rider.apps.core.permissions import IsMaintenanceUsr, IsStation, IsAdminUsr
from rest_framework.permissions import IsAuthenticated

class BikeHookViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = BikeHookSerializer
    queryset = Bike.objects.all()

    def get_permissions(self):
        if (self.request.path.startswith("/api/bikes/hook/")):
            self.permission_classes = [IsStation]
        else :
            self.permission_classes = [IsStation, IsAuthenticated, NotActiveTravels]
        return [permission() for permission in self.permission_classes]

    def update(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user,
            'station': request.station
        }
        bike = self.get_object()
        serializer = self.serializer_class()
        hook = request.path.startswith("/api/bikes/hook/")

        if hook:
            serializer.hook(bike, serializer_context)
        else:
            serializer.unhook(bike, serializer_context)

        return Response({"status": "The bike was " + ("hooked" if hook else "unhooked")}, status=status.HTTP_200_OK)

class ChangeBikeStatusViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = (IsMaintainerBike, IsMaintenanceUsr,)
    serializer_class = BikeStatusSerializer
    queryset = Bike.objects.all()
    def update(self,request, *args, **kwargs):
        bike = self.get_object()
        serializer_data = request.data
        serializer = self.serializer_class(
            bike,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class BikeMaintainerListViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsMaintenanceUsr | IsAdminUsr,)
    serializer_class = BikeStationMaintainerSerializer

    def get_queryset(self):
        # Shows all bikes that aren't hooked to a station at the moment
        return Bike.objects.filter(station=None)
