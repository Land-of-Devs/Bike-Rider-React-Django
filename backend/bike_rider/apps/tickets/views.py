from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import SupportTicket, MaintenanceTicket
from .serializers import TicketMaintenanceSerializer, TicketSupportSerializer


class MaintenanceTicketViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceTicket.objects.all()
    serializer_class = TicketMaintenanceSerializer
    permission_classes = [IsAuthenticated]

class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = TicketSupportSerializer
    permission_classes = [AllowAny]