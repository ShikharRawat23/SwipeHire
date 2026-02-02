from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Swipe
from jobs.models import Job
from resumes.models import Resume

User = get_user_model()

# SAVE SWIPE
class SaveSwipeView(APIView):

    def post(self, request):

        job_id = request.data.get("job_id")
        action = request.data.get("action")
        username = request.data.get("username")

        if not job_id or not action or not username:
            return Response({"error":"Missing fields"}, status=400)

        User = get_user_model()
        user = User.objects.get(username=username)
        job = Job.objects.get(id=job_id)

        Swipe.objects.create(
            user=user,
            job=job,
            action=action
        )

        return Response({"message":"Swipe saved successfully"})

# GET LIKED JOBS
class LikedJobsView(APIView):

    def get(self, request):
        username = request.GET.get("username")

        User = get_user_model()
        user = User.objects.get(username=username)

        swipes = Swipe.objects.filter(
            user=user,
            action="LIKE"
        )

        data = []

        for s in swipes:
            job = s.job
            data.append({
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary": job.salary,
                "status": s.recruiter_decision or "PENDING"
            })

        return Response(data)



# GET REJECTED JOBS
class JobLikedUsersView(APIView):

    def get(self, request, job_id):

        swipes = Swipe.objects.filter(
            job_id=job_id,
            action="LIKE"
        )

        data = []

        for s in swipes:

            resume = Resume.objects.filter(user=s.user).first()

            data.append({
                "swipe_id": s.id,
                "username": s.user.username,
                "email": s.user.email,
                "skills": resume.skills.split(",") if resume else [],
                "resume": resume.file.url if resume else None,
                "status": s.recruiter_decision
            })

        return Response(data)
class JobLikedUsersView(APIView):

    def get(self, request, job_id):

        swipes = Swipe.objects.filter(
            job_id=job_id,
            action="LIKE"
        )

        data = []

        for s in swipes:

            resume = Resume.objects.filter(user=s.user).first()

            data.append({
                "swipe_id": s.id,
                "username": s.user.username,
                "email": s.user.email,
                "skills": resume.skills.split(",") if resume else [],
                "resume": resume.file.url if resume else None   # ✅ IMPORTANT
            })

        return Response(data)

    
class RecruiterDecisionView(APIView):

    def post(self, request):

        swipe_id = request.data.get("swipe_id")
        decision = request.data.get("decision")

        swipe = Swipe.objects.get(id=swipe_id)
        swipe.recruiter_decision = decision
        swipe.save()

        return Response({"message":"Decision saved"})
