from django.db import models
from django.conf import settings
import pdfplumber


# -----------------------------
# SIMPLE SKILL DATABASE
# -----------------------------

SKILLS_DB = [
    "python", "django", "flask", "java", "c", "c++",
    "javascript", "react", "node",
    "html", "css", "bootstrap",
    "sql", "mysql", "mongodb",
    "machine learning", "data science",
    "ai", "deep learning",
    "aws", "docker", "linux", "git"
]


# -----------------------------
# RESUME MODEL
# -----------------------------

class Resume(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    file = models.FileField(upload_to="resumes/")
    skills = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):

        # Save file first
        super().save(*args, **kwargs)

        text = ""

        # Extract text from PDF
        try:
            with pdfplumber.open(self.file.path) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted.lower()
        except:
            pass

        # Extract skills
        found_skills = set()

        for skill in SKILLS_DB:
            if skill in text:
                found_skills.add(skill)

        self.skills = ", ".join(found_skills)

        # Save only skills field
        super().save(update_fields=["skills"])

    def __str__(self):
        return self.user.username
