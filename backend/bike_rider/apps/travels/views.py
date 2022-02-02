from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import UserTravels
from .models import Travel
from django.db.models import Q
from datetime import datetime, timedelta


class UserTravelsViewSet(mixins.ListModelMixin ,viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserTravels

    def get_queryset(self):
        today = datetime.today()
        month_ago = today - timedelta(days=30)
        return Travel.objects.filter(
            user=self.request.user
        ).filter(
            Q(start__gte=month_ago)
        )