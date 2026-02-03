from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

User = get_user_model()

@method_decorator(csrf_exempt, name="dispatch")
class LoginView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = request.data

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return Response(
                {"error": "Missing fields"},
                status=400
            )

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"},
                status=400
            )

        if not user.check_password(password):
            return Response(
                {"error": "Invalid credentials"},
                status=400
            )

        return Response({
            "username": user.username,
            "role": user.role
        })