from django.urls import path
from .views import (
    SaveSwipeView,
    LikedJobsView,
    JobLikedUsersView,
    RecruiterDecisionView
)

urlpatterns = [
    path("save/", SaveSwipeView.as_view()),
    path("liked/", LikedJobsView.as_view()),
    path("job/<int:job_id>/likes/", JobLikedUsersView.as_view()),
    path("decision/", RecruiterDecisionView.as_view()),
]
