from django.db import models
from django.conf import settings

class QuestionnaireResponse(models.Model):
    # Link to the user by email (can link to user model too if preferred)
    user_email = models.EmailField()
    
    # All the questionnaire fields from the frontend
    gender = models.CharField(max_length=10, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    systolicBP = models.IntegerField(blank=True, null=True)
    diastolicBP = models.IntegerField(blank=True, null=True)
    heartRate = models.IntegerField(blank=True, null=True)
    cigarettesPerDay = models.IntegerField(blank=True, null=True)
    smokingStatus = models.CharField(max_length=50, blank=True, null=True)
    cholesterolIntake = models.CharField(max_length=50, blank=True, null=True)
    glucoseIntake = models.CharField(max_length=50, blank=True, null=True)
    maritalStatus = models.CharField(max_length=50, blank=True, null=True)
    pregnancies = models.IntegerField(blank=True, null=True)
    workType = models.CharField(max_length=50, blank=True, null=True)
    residenceType = models.CharField(max_length=50, blank=True, null=True)
    diabetesHistory = models.CharField(max_length=50, blank=True, null=True)
    chestPain = models.CharField(max_length=50, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Questionnaire for {self.user_email} - {self.created_at.strftime('%Y-%m-%d')}"
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Questionnaire Response"
        verbose_name_plural = "Questionnaire Responses" 