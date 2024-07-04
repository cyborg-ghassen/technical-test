from rest_framework import viewsets, permissions

from .serializers import PostSerializer
from post.models import Post


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
