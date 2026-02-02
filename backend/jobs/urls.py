from django.urls import path
from .views import JobListView, CreateJobView,RecruiterJobsView ,UnswipedJobsView
from .views import DeleteJobView,MatchedJobsView
from .views import MyJobsView

urlpatterns = [
    path("", JobListView.as_view()),
    path("", MatchedJobsView.as_view()),
    path("create/", CreateJobView.as_view()),
    path("myjobs/<str:username>/", RecruiterJobsView.as_view()),
    path("unswiped/<str:username>/", UnswipedJobsView.as_view()),
    path("delete/<int:job_id>/", DeleteJobView.as_view()),
    path("myjobs/", MyJobsView.as_view()),
]
