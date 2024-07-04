from django.urls import path

from .viewsets import LoginView, LogoutView, setCSRFCookie

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('setcsrf/', setCSRFCookie.as_view(), name='setcsrf'),
]
