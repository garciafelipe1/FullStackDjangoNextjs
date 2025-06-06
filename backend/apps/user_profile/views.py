
from rest_framework import permissions,status   
from rest_framework_api.views import StandardAPIView,APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime, timedelta
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.core.exceptions import ValidationError
from rest_framework.response import Response
User = get_user_model()
from django.http import FileResponse, Http404
from utils.string_utils import sanitize_string,sanitize_html,sanitize_username,sanitize_url
from rest_framework.parsers import MultiPartParser, FormParser
import os
from apps.authentication.serializers import UserPublicSerializer

from django.shortcuts import get_object_or_404

class MyUserProfileView(StandardAPIView):
    permission_classes = [ permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        user_profile = UserProfile.objects.get(user=user)
        serialized_user_profile = UserProfileSerializer(user_profile).data
        return self.response(serialized_user_profile)
class DetailUserProfileView(StandardAPIView):
    def get(self, request):
        username=request.query_params.get("username",None)
        if not username:
            return self.error("a valid username must be provided")
        try:
            user=User.objects.get(username=username)
        except User.DoesNotExist:
            return self.response("user does not exists",status=status.HTTP_404_NOT_FOUND)
        
        serialized_user=UserPublicSerializer(user).data

        
        user_profile = UserProfile.objects.get(user=user)
        serialized_user_profile = UserProfileSerializer(user_profile).data
        
        return self.response({
            "user":serialized_user,
            "profile":serialized_user_profile
        })
    
class GetMyProfilePictureView(StandardAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        profile = get_object_or_404(UserProfile, user=user)
        print(f"Profile picture: {profile.profile_picture}")
        if not profile.profile_picture:
            return Response("No profile picture found.", status=404)

        picture_url = request.build_absolute_uri(profile.profile_picture.url) 

        return self.response({"profile_picture_url": picture_url})


class GetMyBannerPictureView(StandardAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        profile = get_object_or_404(UserProfile, user=user)
        print(f"Profile banner:{profile.profile_banner}")
        if not profile.profile_banner:
            return Response("No banner picture found.", status=404)

        picture_url = request.build_absolute_uri(profile.profile_banner.url) 

        return self.response({"banner_picture_url": picture_url}) 
    
class UpdateUserProfileView(StandardAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, request):
        user = request.user
        profile = UserProfile.objects.get(user=user)
        
        biography = request.data.get("biography", None)
        birthday = request.data.get("birthday", None)
        website = request.data.get("website", None)
        instagram = request.data.get("instagram", None)
        facebook = request.data.get("facebook", None)
        linkedin = request.data.get("linkedin", None)
        youtube = request.data.get("youtube", None)
        tiktok = request.data.get("tiktok", None)
        github = request.data.get("github", None)
        snapchat = request.data.get("snapchat", None)
        twitter = request.data.get("twitter", None)
        

        try:
            if biography:
                profile.biography = sanitize_html(biography)
            if birthday:
                # Validar y transformar el formato de la fecha
                try:
                    formatted_birthday = datetime.strptime(birthday, "%Y-%m-%d").date()
                    profile.birthday = formatted_birthday
                except ValueError:
                    raise ValidationError("Invalid date format. Use YYYY-MM-DD.")
            if instagram:
                profile.instagram = sanitize_url(instagram)
            if facebook:
                profile.facebook = sanitize_url(facebook)
            if linkedin:
                profile.linkedin = sanitize_url(linkedin)
            if youtube:
                profile.youtube = sanitize_url(youtube)
            if tiktok:
                profile.tiktok = sanitize_url(tiktok)
            if github:
                profile.github = sanitize_url(github)
            if website:
                profile.website = sanitize_url(website)
            if snapchat:
                profile.snapchat = sanitize_url(snapchat)
            if twitter:
                profile.twitter = sanitize_url(twitter)
                

            profile.save()

            return self.response("Profile has been updated successfully.")
        except ValidationError as e:
            return self.error(str(e))



class UploadProfilePictureView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        # Imprimir request.FILES
        print("request.FILES:", request.FILES)
        # Imprimir request.POST
        print("request.POST:", request.POST)

        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found."}, status=404)

        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return Response({"results": "No file uploaded."}, status=400)

        profile.profile_picture = uploaded_file  # Django se encarga de guardarlo
        profile.save()

        return Response({"message": "Profile picture has been updated."}, status=200)
    

class UploadBannerPictureView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        # Imprimir request.FILES
        print("request.FILES:", request.FILES)
        # Imprimir request.POST
        print("request.POST:", request.POST)

        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found."}, status=404)

        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return Response({"results": "No file uploaded."}, status=400)

        profile.profile_banner = uploaded_file  # Django se encarga de guardarlo
        profile.save()

        return Response({"message": "Profile picture has been updated."}, status=200)
    
    