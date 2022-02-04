import datetime
import jwt

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail, get_connection
from django.contrib.auth.models import Group
from django.conf import settings

from .models import User

@receiver(post_save, sender=User)
def add_group_to_admin_role_users(sender, instance, *args, **kwargs):
    try:
        group = Group.objects.get(name='Admins')
    except:
        return

    if instance.role == 'ADMIN':
        instance.groups.add(group)
    else:
        instance.groups.remove(group)
