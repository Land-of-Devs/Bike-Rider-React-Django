from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import BStation
from .serializers import BStationSerializer
# Create your views here.

class BStationViewSet(viewsets.ModelViewSet):
    queryset = BStation.objects.all()
    serializer_class = BStationSerializer
    permission_classes = [permissions.IsAuthenticated]
