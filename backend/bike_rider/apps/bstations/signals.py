import datetime
import jwt

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from .models import BStation
from bike_rider.apps.users.models import User

@receiver(post_save, sender=BStation)
def send_station_setup_token_to_maintainer(sender, instance, *args, **kwargs):
    if not (instance and instance.maintainer and not instance.ip):
        return
    
    user = User.objects.get(pk=instance.maintainer)
    if not user.email:
        return
    
    payload = {
        'station_id': instance.id,
        'exp': datetime.utcnow() + datetime.timedelta(days=2)
    }

    token = jwt.encode(
        payload,
        settings.JWT_AUTH.JWT_STATION_CONFIG_SECRET_KEY,
        settings.JWT_AUTH.JWT_ALGORITHM
    ).decode('utf-8')
    
    send_mail(
        'Setup token for station ' + instance.id,
        'Hello, this is the setup token for station #' + instance.id + '\r\n'
        + 'Token: ' + token,
        'from@example.com',
        [user.email],
        fail_silently=False,
    )
