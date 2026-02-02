from django.urls import path
from .views import ResumeUploadView, UserProfileView,CheckProfileView

urlpatterns = [
    path("upload/", ResumeUploadView.as_view()),
    path("profile/<str:username>/", UserProfileView.as_view()),
    path("check/<str:username>/", CheckProfileView.as_view()),

]
