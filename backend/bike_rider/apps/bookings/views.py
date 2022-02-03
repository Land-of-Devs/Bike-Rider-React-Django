from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, mixins, status
from .models import Booking
from .serializers import BookingSerializer
from .permissions import HasNotBooking
from rest_framework.permissions import IsAuthenticated
from pprint import pprint
from rest_framework.views import Response

class BookingViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [HasNotBooking]
    
    def get_permissions(self):
        
        if self.action == 'create':        
            permission_classes = [HasNotBooking]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user
        }
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        booking = serializer.reservation(serializer_context)
        return Response({'booking': booking}, status=status.HTTP_200_OK)
        #pprint(self.get_object())

    def update(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user
        }
        instance = self.get_object()
        serializer = self.serializer_class()
        serializer.cancel(instance)
        return Response({}, status=status.HTTP_200_OK)
        #pprint(self.get_object())
