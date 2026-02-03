from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from accounts.models import Profile   # make sure this exists

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        role = request.data.get("role", "jobseeker")

        if not username or not password:
            return Response({"error": "Missing fields"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            password=password
        )

        # Create profile with role
        Profile.objects.create(
            user=user,
            role=role
        )

        return Response({"message": "User registered successfully"})


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)

        if not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=400)

        return Response({
            "username": user.username,
            "role": user.profile.role
        })
