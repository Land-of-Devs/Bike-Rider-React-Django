import datetime
import jwt

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail, get_connection
from django.conf import settings

from .models import BStation
from bike_rider.apps.users.models import User
from bike_rider.apps.core.threads import queue_message

@receiver(post_save, sender=BStation)
def send_station_setup_token_to_maintainer(sender, instance, *args, **kwargs):
    if not (instance and instance.maintainer and not instance.ip):
        return
    
    user = instance.maintainer
    if not user.email:
        return
    
    payload = {
        'station_id': instance.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2)
    }

    token = jwt.encode(
        payload,
        settings.JWT_AUTH['JWT_STATION_CONFIG_SECRET_KEY'],
        settings.JWT_AUTH['ALGORITHM']
    )
    
    print('Sending setup mail to ' + user.email)

    queue_message((
        'Setup token for station ' + str(instance.id),
        'Hello, this is the setup token for station #' + str(instance.id) + '\r\n'
        + 'Token: ' + token,
        settings.EMAIL_HOST_USER,
        [user.email],
    ))