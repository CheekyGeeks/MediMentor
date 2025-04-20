from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    UserView, 
    QuestionnaireResponseCreateView, 
    UserQuestionnaireResponseView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    
    # Questionnaire endpoints
    path('questionnaire/submit/', QuestionnaireResponseCreateView.as_view(), name='questionnaire-submit'),
    path('questionnaire/latest/', UserQuestionnaireResponseView.as_view(), name='questionnaire-latest'),
]