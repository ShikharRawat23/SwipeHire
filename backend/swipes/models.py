from django.db import models
from django.conf import settings
from jobs.models import Job

class Swipe(models.Model):

    ACTIONS = (
        ("LIKE","LIKE"),
        ("REJECT","REJECT")
    )

    DECISIONS = (
        ("PENDING","PENDING"),
        ("ACCEPTED","ACCEPTED"),
        ("REJECTED","REJECTED")
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    job = models.ForeignKey(Job,on_delete=models.CASCADE)
    action = models.CharField(max_length=10,choices=ACTIONS)
    recruiter_decision = models.CharField(
        max_length=10,
        choices=DECISIONS,
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.job} - {self.recruiter_decision}"
