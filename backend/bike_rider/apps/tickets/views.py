from pprint import pprint
from rest_framework import serializers, viewsets, mixins, status
from rest_framework.views import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import SupportTicket, MaintenanceTicket
from .serializers import TicketMaintenanceSerializer, TicketSupportSerializer
from django.db.models import Q

class StaffListTicketViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'MAINTENANCE' :
            return MaintenanceTicket.objects.filter(
                Q(station_id__maintainer=self.request.user) | 
                Q(bike_id__station__maintainer=self.request.user)
            )

        if self.request.user.role == 'SUPPORT':
            return SupportTicket.objects.all()

    def get_serializer_class(self):
        if(self.request.user.role == 'MAINTENANCE'):
            return TicketMaintenanceSerializer
        if(self.request.user.role == 'SUPPORT'):
            return TicketSupportSerializer

class UserSendTicketViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    def create(self, request):
        ticket = request.data.get('ticket', {})
        head = ticket.get('ticket_head', {})
        if(head.get('type', {}) == 'MAINTENANCE'):
            serializer_context = {
                'client': request.user,
                'bike': ticket.get('bike', {}),
                'station': ticket.get('station', {}),
                'request': request
            }
        else:
            serializer_context = {
                'client': request.user,
                'request': request
            }

        serializer_data = ticket

        serializer = self.get_serializer_class(
            data=serializer_data, 
            context=serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get_serializer_class(self, data, context):
        ticket = self.request.data.get('ticket', {})
        head = ticket.get('ticket_head', {})
        if(head.get('type', {}) == 'MAINTENANCE'):
            return TicketMaintenanceSerializer(data=data, context=context)
        else:
            return TicketSupportSerializer(data=data, context=context)