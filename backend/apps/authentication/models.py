import uuid

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

from utils.string_utils import sanitize_username
class UserAccountManager(BaseUserManager):

    RESTRICTED_USERNAMES = ["admin", "undefined", "null", "superuser", "root", "system"]

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Users must have an email address.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        first_name = extra_fields.get("first_name", None)
        last_name = extra_fields.get("last_name", None)

        if not first_name or not last_name:
            raise ValueError("Users must have a first name and last name")

        user.first_name = first_name
        user.last_name = last_name

        username = extra_fields.get("username", None)

        if username:
            sanitized_username = sanitize_username(username)  # Asignar aquí si username existe

            # Verificar si el nombre de usuario está en la lista de restringidos
            if sanitized_username.lower() in self.RESTRICTED_USERNAMES:
                raise ValueError(f"The username '{sanitized_username}' is not allowed.")

            user.username = sanitized_username
        else:
            user.username = None  # O podrías generar un username por defecto o lanzar un error

        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password, **extra_Fields):
        user = self.create_user(email, password, **extra_Fields)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.role = 'admin'
        
        user.save(using=self._db)
        return user
    
    
class  UserAccount(AbstractBaseUser, PermissionsMixin):
    
    roles=(
        ("admin","Admin"),
        ("moderator","Moderator"),
        ("helper","Helper"),
        ("editor","Editor"),
        ("customer","Customer"),
        ("seller","Seller")       
    )
    
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=True)
    email = models.EmailField( unique=True) 
    username= models.CharField(max_length=100, unique=True)
    
    first_name = models.CharField(max_length=100)
    last_name= models.CharField(max_length=100)
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    role=models.CharField(max_length=20, choices=roles, default="customer")
    verified = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    two_factor_enabled = models.BooleanField(default=False)
    otpauth_url= models.CharField(max_length=255,null=True,blank=True)  
    otp_base32 = models.CharField(max_length=255,null=True)
    otp_secret = models.CharField(max_length=255,null=True)
    qr_code = models.ImageField(upload_to='qrcode/', null=True, blank=True)
    login_otp = models.CharField(max_length=255, null=True, blank=True)
    login_otp_used= models.BooleanField(default=False)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    
    login_ip=models.CharField(max_length=255, null=True, blank=True)
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    def __str__(self):
        return self.username
    
    def get_qr_code(self):
        if self.qr_code and hasattr(self.qr_code, 'url'):
            return self.qr_code.url
        return None