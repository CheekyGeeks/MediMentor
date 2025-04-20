from django.contrib import admin
from .models import QuestionnaireResponse

@admin.register(QuestionnaireResponse)
class QuestionnaireResponseAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'gender', 'age', 'created_at']
    list_filter = ['gender', 'created_at', 'workType', 'residenceType', 'diabetesHistory']
    search_fields = ['user_email']
    date_hierarchy = 'created_at'
    fieldsets = (
        ('User Information', {
            'fields': ('user_email', 'created_at', 'updated_at')
        }),
        ('Demographics', {
            'fields': ('gender', 'age', 'maritalStatus', 'workType', 'residenceType')
        }),
        ('Physical Measurements', {
            'fields': ('height', 'weight', 'systolicBP', 'diastolicBP', 'heartRate')
        }),
        ('Health Habits', {
            'fields': ('cigarettesPerDay', 'smokingStatus', 'cholesterolIntake', 'glucoseIntake')
        }),
        ('Medical History', {
            'fields': ('pregnancies', 'diabetesHistory', 'chestPain')
        }),
    )
    readonly_fields = ('created_at', 'updated_at') 