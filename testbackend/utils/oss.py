from django.conf import settings
from django_oss_storage.backends import OssStaticStorage


class StaticStorage(OssStaticStorage):
    """Used to manage static files for the web server"""
    location = settings.STATIC_LOCATION
    default_acl = 'public-read'


class PublicMediaStorage(OssStaticStorage):
    location = 'media'
    default_acl = 'public-read'
    file_overwrite = False


class PrivateMediaStorage(OssStaticStorage):
    location = 'private'
    default_acl = 'private'
    file_overwrite = False
    custom_domain = False
