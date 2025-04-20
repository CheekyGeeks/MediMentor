# authentication/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, QuestionnaireResponse

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'name', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'name')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

admin.site.register(User, UserAdmin)

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

admin.site.site_header = 'MediMentor Administration'
admin.site.site_title = 'MediMentor Admin Portal'
admin.site.index_title = 'Welcome to MediMentor Admin Portal'