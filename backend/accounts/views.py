from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model

User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == "POST":

        try:
            body = request.body.decode("utf-8")
            print("RAW BODY:", body)
            data = json.loads(body)
        except Exception as e:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        username = data.get("username")
        password = data.get("password")
        role = data.get("role")

        if not username or not password or not role:
            return JsonResponse({"error": "Missing fields"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "User exists"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        user.role = role
        user.save()

        return JsonResponse({"message": "User registered"}, status=201)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
