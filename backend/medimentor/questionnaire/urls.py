from django.urls import path
from .views import QuestionnaireResponseCreateView, UserQuestionnaireResponseView

urlpatterns = [
    path('submit/', QuestionnaireResponseCreateView.as_view(), name='questionnaire-submit'),
    path('latest/', UserQuestionnaireResponseView.as_view(), name='questionnaire-latest'),
] 