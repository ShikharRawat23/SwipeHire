from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from rest_framework import status
from django.contrib.auth import get_user_model

from swipes.models import Swipe

class JobListView(APIView):

    def get(self, request):

        username = request.GET.get("username")

        User = get_user_model()
        user = User.objects.get(username=username)

        # Jobs user already swiped
        swiped_jobs = Swipe.objects.filter(user=user).values_list("job_id", flat=True)

        # Exclude swiped jobs
        jobs = Job.objects.exclude(id__in=swiped_jobs)

        data = []

        for job in jobs:
            data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary": job.salary
            })

        return Response(data)

class CreateJobView(APIView):
    def post(self, request):

        title = request.data.get("title")
        company = request.data.get("company")
        location = request.data.get("location")
        salary = request.data.get("salary")

        if not all([title, company, location, salary]):
            return Response(
                {"error":"All fields required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        job = Job.objects.create(
            title=title,
            company=company,
            location=location,
            salary=salary
        )

        return Response(
            {"message":"Job created successfully"},
            status=status.HTTP_201_CREATED
        )

class RecruiterJobsView(APIView):

    def get(self, request, username):

        jobs = Job.objects.filter(
            recruiter__username=username
        )

        data = []
        for job in jobs:
            data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary": job.salary
            })

        return Response(data)
class UnswipedJobsView(APIView):

    def get(self, request, username):

        User = get_user_model()
        user = User.objects.get(username=username)

        swiped_jobs = Swipe.objects.filter(user=user).values_list("job_id", flat=True)

        jobs = Job.objects.exclude(id__in=swiped_jobs)

        data = []
        for job in jobs:
            data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary": job.salary
            })

        return Response(data)
class DeleteJobView(APIView):

    def delete(self, request, job_id):

        Job.objects.filter(id=job_id).delete()
        return Response({"message":"Job deleted"})
class MyJobsView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        data = []

        for j in jobs:
            data.append({
                "id": j.id,
                "title": j.title,
                "company": j.company,
                "location": j.location,
                "salary": j.salary
            })

        return Response(data)
class MatchedJobsView(APIView):

    def get(self, request):

        username = request.GET.get("username")
        User = get_user_model()
        user = User.objects.get(username=username)

        # Jobs already swiped by user
        swiped_jobs = Swipe.objects.filter(user=user)\
                                   .values_list("job_id", flat=True)

        # Exclude swiped jobs
        jobs = Job.objects.exclude(id__in=swiped_jobs)

        data = []

        for job in jobs:
            data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary": job.salary
            })

        return Response(data)