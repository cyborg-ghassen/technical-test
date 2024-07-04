from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import File
from utils.functions import run_model


@receiver(post_save, sender=File)
def file_post_save(sender, instance, created, **kwargs):
    if created:
        run_model(file=instance)
