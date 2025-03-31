from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields= [
            'profile_picture',
            'profile_banner',
            'biography',
            'birthday',
            'website',
            'facebook',
            'twitter',
            'instagram',
            'github',
            'linkedin',
            'youtube',
            'tiktok',
            'snapchat',
        ]