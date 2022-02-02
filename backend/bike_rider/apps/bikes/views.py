from django.shortcuts import render
from rest_framework import mixins, viewsets, status
from rest_framework.views import Response
from .serializers import BikeHookSerializer
from pprint import pprint
from .models import Bike

class BikeHookViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = BikeHookSerializer
    queryset = Bike.objects.all()

    def update(self, request, *args, **kwargs):
        serializer_context = {
            'user': request.user
        }
        bike = self.get_object()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid()
        serializer.hook(bike, serializer_context)
        return Response({"status": "Bike was hooked"}, status=status.HTTP_200_OK)
