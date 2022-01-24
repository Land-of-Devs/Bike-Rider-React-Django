from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from bike_rider.apps.subscriptions.models import Subscription
from bike_rider.apps.core.models import TimestampedModel


class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a `User` for free. 

    All we have to do is override the `create_user` function which we will use
    to create `User` objects.
    """

    def create_user(self, dni, email, password=None, role="user"):
        """Create and return a `User` with an email, username and password."""
        if dni is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(dni=dni, email=self.normalize_email(email), role=role)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, dni, email, password, role):
      """
      Create and return a `User` with superuser powers.

      Superuser powers means that this use is an admin that can do anything
      they want.
      """
      if password is None:
          raise TypeError('Superusers must have a password.')

      user = self.create_user(dni, email, password, role)
      user.is_superuser = True
      user.is_staff = True
      user.save()

      return user


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    ROLE_CHOICES = [
        ('USER', 'user'),
        ('SUPPORT', 'support'),
        ('MAINTENANCE', 'maintenance'),
        ('ADMIN', 'admin')
    ]
    dni = models.CharField(max_length=9, validators=[MinLengthValidator(9)], unique=True, db_index=True)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    role = models.CharField(choices=ROLE_CHOICES, default='user', max_length=32)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, null=True)

    # The `is_staff` flag is expected by Django to determine who can and cannot
    # log into the Django admin site. For most users, this flag will always be
    # falsed.
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'dni'
    REQUIRED_FIELDS = ['email', 'role']
    objects = UserManager()