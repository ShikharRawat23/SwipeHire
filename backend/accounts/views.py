from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

User = get_user_model()

@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = request.data

        username = data.get("username")
        password = data.get("password")
        role = data.get("role")

        if not username or not password or not role:
            return Response(
                {"error": "Missing fields"},
                status=400
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "User already exists"},
                status=400
            )

        user = User.objects.create_user(
            username=username,
            password=password
        )
        user.role = role
        user.save()

        return Response(
            {"message": "User registered successfully"},
            status=201
        )