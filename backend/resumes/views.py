from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .models import Resume
import pdfplumber

# -------------------------------
# SKILL EXTRACTION
# -------------------------------

def extract_skills(file_path):

    SKILLS_DB = [
        "python","java","c","c++","javascript","react","django","flask",
        "node","sql","mysql","mongodb","html","css","bootstrap",
        "machine learning","data science","ai","deep learning",
        "git","github","docker","aws","linux"
    ]

    text = ""

    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                if page.extract_text():
                    text += page.extract_text().lower()
    except:
        return []

    found = []
    for s in SKILLS_DB:
        if s in text and s not in found:
            found.append(s)

    return found


# -------------------------------
# UPLOAD / UPDATE PROFILE
# -------------------------------

class ResumeUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):

        User = get_user_model()

        username = request.data.get("username")
        name = request.data.get("name")
        email = request.data.get("email")
        file = request.FILES.get("file")

        if not all([username, name, email, file]):
            return Response({"error":"All fields required"}, status=400)

        try:
            user = User.objects.get(username=username)
        except:
            return Response({"error":"User not found"}, status=404)

        resume, created = Resume.objects.get_or_create(user=user)
        resume.file = file
        resume.save()

        skills = extract_skills(resume.file.path)
        resume.skills = ",".join(skills)
        resume.save()

        user.first_name = name
        user.email = email
        user.save()

        return Response({
            "message":"Profile saved",
            "skills": skills
        })


# -------------------------------
# GET PROFILE
# -------------------------------

class UserProfileView(APIView):

    def get(self, request, username):

        User = get_user_model()

        try:
            user = User.objects.get(username=username)
        except:
            return Response({"error":"User not found"}, status=404)

        resume = Resume.objects.filter(user=user).first()

        return Response({
            "username": user.username,
            "email": user.email,
            "resume": resume.file.url if resume else None,
            "skills": resume.skills.split(",") if resume and resume.skills else []
        })


# -------------------------------
# CHECK PROFILE
# -------------------------------

class CheckProfileView(APIView):

    def get(self, request, username):

        User = get_user_model()

        try:
            user = User.objects.get(username=username)
        except:
            return Response({"hasProfile": False})

        return Response({
            "hasProfile": Resume.objects.filter(user=user).exists()
        })
