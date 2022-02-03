from rest_framework import viewsets, mixins, status, views
from rest_framework.views import Response
from bike_rider.apps.core.permissions import IsMaintenanceUsr, IsSupportUsr
from .permissions import HisMaintenanceTickets
from rest_framework.permissions import IsAuthenticated
from .models import SupportTicket, MaintenanceTicket, Ticket
from bike_rider.apps.core.serializers import EmailSerializer
from .serializers import TicketMaintenanceSerializer, TicketStatusSerializer, TicketSupportSerializer
from django.db.models import Q

class ChangeTicketStatusViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = [HisMaintenanceTickets | IsSupportUsr]
    serializer_class = TicketStatusSerializer

    def get_queryset(self):
        if self.request.user.role == 'MAINTENANCE' :
            return Ticket.objects.filter(type='MAINTENANCE')
        if self.request.user.role == 'SUPPORT':
            return Ticket.objects.filter(type='SUPPORT')

    def update(self,request, *args, **kwargs):
            ticket = self.get_object()
            serializer_data = request.data
            serializer = self.serializer_class(
                ticket,
                data=serializer_data, 
                partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

class StaffListTicketViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsMaintenanceUsr | IsSupportUsr ]

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

class SendTicketEmailViewSet(views.APIView):
    permission_classes= ( IsAuthenticated, IsSupportUsr, )
    serializer_class = EmailSerializer
    
    def post(self, request): 

        try:
            serializer_data = request.data
            serializer = self.serializer_class(
                data=serializer_data
            )
            serializer.is_valid(raise_exception=True)
            serializer.send()
            
            return Response({'message': 'Message Send Correctly!'}, status=200)
        except Exception as e:
            raise e
