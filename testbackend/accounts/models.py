from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models


# Create your models here.
class UserManager(BaseUserManager):
    """ User Model Manager """

    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have username')
        if not email:
            raise ValueError('Users must have email Address')
        if not password:
            raise ValueError('User must have Password')

        user_obj = self.model(
            username=username,
            **extra_fields
        )

        user_obj.set_password(password)
        user_obj.save(using=self._db)

        return user_obj

    def create_staffuser(self, username, email, password=None):
        user = self.create_user(
            username,
            email,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username,
            email,
            password=password,
            is_staff=True,
            is_superuser=True,
        )
        return user


class User(AbstractUser, PermissionsMixin):
    """
    Custom abstract user Model.
    """
    # Names
    first_name = models.CharField(max_length=15, blank=True, null=True)
    last_name = models.CharField(max_length=15, blank=True, null=True)
    # contact
    username = models.CharField(max_length=255, unique=True)  # require
    # Registration
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Permission
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    # Main Field for authentication
    USERNAME_FIELD = 'username'
    # permissions
    objects = UserManager()

    # When user create must need to fill this field
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    class Meta:
        ordering = ('-created_at', '-updated_at',)

    @property
    def get_full_name(self):
        if self.first_name:
            return f'{self.first_name} {self.last_name}'
        return self.email.split('@')[0]

    def get_email_field_name(*args):
        return "email"
