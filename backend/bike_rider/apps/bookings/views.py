from rest_framework import viewsets, mixins, status
from .models import Booking
from .serializers import BookingSerializer
from .permissions import HasNotBooking, HasBooking
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
from rest_framework import exceptions
from django.utils import timezone

class BookingViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def get_permissions(self):
        
        if self.action == 'create':
            permission_classes = [IsAuthenticated, HasNotBooking]
        else:
            permission_classes = [IsAuthenticated, HasBooking]
        return [permission() for permission in permission_classes]

    def get_object(self):
        try:
            obj = Booking.objects.get(user=self.request.user, time_end__gt=timezone.now())
            print(obj)
            self.check_object_permissions(self.request, obj)
            return obj
        except:
            raise exceptions.NotFound('You don\'t have an active booking')

    def create(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user
        }
        serializer = self.serializer_class()
        serializer.reservation(
            request.data,
            serializer_context
        )
        return Response({'booking': 'You create successfuly a Reservation!'}, status=status.HTTP_200_OK)
