from django.db import models
import uuid
from django.conf import settings
from ckeditor.fields import RichTextField
from djoser.signals import user_registered, user_activated


User= settings.AUTH_USER_MODEL

class UserProfile(models.Model):
    id = models.UUIDField( default=uuid.uuid4, unique=True, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    profile_banner = models.ImageField(upload_to='profile_banners/', null=True, blank=True)

    biography =RichTextField()
    birthday= models.DateField(null=True, blank=True)
    
    website= models.URLField(blank=True,default='')
    facebook= models.URLField(blank=True,default='')
    twitter= models.URLField(blank=True,default='')
    instagram= models.URLField(blank=True,default='')
    github= models.URLField(blank=True,default='')
    linkedin= models.URLField(blank=True,default='')
    youtube= models.URLField(blank=True,default='')
    tiktok= models.URLField(blank=True,default='')
    snapchat= models.URLField(blank=True,default='')


    
    
      
      
def post_user_activated(user, *args, **kwargs):
    # Verifica si el perfil no existe antes de crearlo
    if not UserProfile.objects.filter(user=user).exists():
        UserProfile.objects.create(user=user)

user_activated.connect(post_user_activated)