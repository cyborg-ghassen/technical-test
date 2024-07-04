from rest_framework import routers

from .viewsets import FileViewSet

router = routers.DefaultRouter()

router.register('', FileViewSet, basename='file')

urlpatterns = [
    *router.urls
]
