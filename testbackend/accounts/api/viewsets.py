from django.contrib.auth import login, logout
from django.contrib.auth.views import LogoutView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializer


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({'detail': 'Successfully logged in'}, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        try:
            logout(request)
            return Response({"message": "Logged out successfully"})
        except Exception as e:
            return Response({"message": str(e)})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class setCSRFCookie(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        return Response({
            "success": "CSRF cookie set",
            "csrftoken": request.COOKIES.get("csrftoken")
        }, status=status.HTTP_200_OK)
