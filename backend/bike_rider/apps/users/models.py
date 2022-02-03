from django.db import models
from django.core.validators import MinLengthValidator, FileExtensionValidator
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
    email = models.CharField(max_length=255)
    role = models.CharField(choices=ROLE_CHOICES, default='user', max_length=32)
    image = models.FileField(upload_to='users', validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])])
    subscription = models.ForeignKey(Subscription, related_name='user', on_delete=models.CASCADE, default=None, blank=True, null=True)
    password = models.CharField(max_length=255)
    
    USERNAME_FIELD = 'dni'
    REQUIRED_FIELDS = ['email', 'role']
    objects = UserManager()

    @property
    def is_staff(self):
        return self.role == 'ADMIN'

    def has_perm(self, perm, obj=None):
        if self.is_staff and not perm.split('.')[1].startswith('delete_'):
            return True

        return super().has_perm(perm, obj)
    
    def has_module_perms(self, app_label):
        return self.is_staff or super().has_module_perms(app_label)
        
