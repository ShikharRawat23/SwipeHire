from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    # Django admin
    path("admin/", admin.site.urls),

    # Backend APIs
    path("api/accounts/", include("accounts.urls")),
    path("api/resume/", include("resumes.urls")),
    path("api/jobs/", include("jobs.urls")),
    path("api/swipes/", include("swipes.urls")),
    path("api/users/", include("users.urls")),
]

# Serve React ONLY for non-admin, non-api routes
urlpatterns += [
    re_path(r"^(?!admin/|api/|media/).*", TemplateView.as_view(template_name="index.html")),
]

# Serve uploaded media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
