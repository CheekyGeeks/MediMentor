# authentication/views.py

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import UserSerializer, RegisterSerializer, QuestionnaireResponseSerializer
from .models import QuestionnaireResponse

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({"error": "Please provide both email and password"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email, password=password)
        
        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

class UserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class QuestionnaireResponseCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # Get the user's email from the authenticated request
        user_email = request.user.email
        
        # Add the user_email to the request data
        data = request.data.copy()
        data['user_email'] = user_email
        
        serializer = QuestionnaireResponseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserQuestionnaireResponseView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user_email = request.user.email
        
        # Get the latest questionnaire response for the user
        try:
            questionnaire = QuestionnaireResponse.objects.filter(user_email=user_email).latest('created_at')
            serializer = QuestionnaireResponseSerializer(questionnaire)
            return Response(serializer.data)
        except QuestionnaireResponse.DoesNotExist:
            return Response({"detail": "No questionnaire responses found for this user."}, status=status.HTTP_404_NOT_FOUND)