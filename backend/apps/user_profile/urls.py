from django.urls import path
from .views import MyUserProfileView,UpdateUserProfileView

urlpatterns = [
    path("my_profile/", MyUserProfileView.as_view(), name="my-profile-view"),
    path("update/", UpdateUserProfileView.as_view(), name="update"),
    
]