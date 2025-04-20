from rest_framework import serializers
from .models import QuestionnaireResponse

class QuestionnaireResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireResponse
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at'] 