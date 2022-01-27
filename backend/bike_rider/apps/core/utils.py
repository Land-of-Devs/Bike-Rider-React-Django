import math

from django.db.models import Func
from rest_framework import serializers

def to_float_or_none(strn):
    try:
        v = float(strn)
        return v if math.isfinite(v) else None
    except:
        return None


# Serializer fields
# class MaintenancePrivateField(serializers.ReadOnlyField):
#     def get_attribute(self, instance):
#         """
#         Given the *outgoing* object instance, return the primitive value
#         that should be used for this field.
#         """
#         user = self.context['request'].user
#         if user and user.is_authenticated and (user.is_superuser or user.role == 'MAINTENANCE'):
#             return super(MaintenancePrivateField, self).get_attribute(instance)
#         return None


# ORM functions
class ApproxDistance(Func):
    function = 'approxDistance'
    arity = 4


class Distance(Func):
    function = 'distance'
    arity = 4
