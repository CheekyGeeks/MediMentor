# authentication/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    objects = UserManager()
    
    def __str__(self):
        return self.email

class QuestionnaireResponse(models.Model):
    # Link to the user by email
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