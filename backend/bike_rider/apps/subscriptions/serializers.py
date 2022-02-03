from ast import Sub
from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
    
    def change_subscription(self, instance, context):
        new_subs = Subscription.objects.get(id=context['id'])
        instance.subscription = new_subs
        instance.save()
        return True