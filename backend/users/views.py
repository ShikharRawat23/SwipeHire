from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

User = get_user_model()


# =========================
# REGISTER
# =========================
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):

    def post(self, request):
        print("REGISTER DATA:", request.data)

        username = request.data.get("username")
        password = request.data.get("password")
        role = request.data.get("role")

        if not username or not password or not role:
            return Response({"error": "Missing fields"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            password=password,
            role=role
        )

        return Response({
            "message": "User registered successfully",
            "username": user.username,
            "role": user.role
        }, status=201)


# =========================
# LOGIN
# =========================
@method_decorator(csrf_exempt, name="dispatch")
class LoginView(APIView):

    def post(self, request):

        print("HEADERS:", request.headers)
        print("BODY RAW:", request.body)
        print("DATA:", request.data)

        return Response({
            "received": request.data
        })