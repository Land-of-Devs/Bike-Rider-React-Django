from rest_framework import mixins, views, viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import SubscriptionSerializer
from .models import Subscription


class ChangeUserSubscriptionViewSet(views.APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscriptionSerializer

    def put(self,request, *args, **kwargs):
        serializer_context = {'id': request.data.get('sub')}
        serializer = self.serializer_class()
        serializer.change_subscription(request.user, serializer_context)
        return views.Response({'status': 'You have a new Subscription!'}, status=status.HTTP_200_OK)

class SubscriptionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubscriptionSerializer
    permissions_classes = (IsAuthenticated, )
    queryset = Subscription.objects.all()