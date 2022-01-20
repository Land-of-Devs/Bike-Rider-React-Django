from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from subscription.modal import Subscription

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('USER', 'user'),
        ('STAFF', 'staff'),
        ('ADMIN', 'admin')
    ]
    dni = models.CharField(max_length=9, min_length=9)
    password = models.CharField(max_length=255)
    email = models.CharField()
    role = models.CharField(choices=ROLE_CHOICES, max_length=32)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)