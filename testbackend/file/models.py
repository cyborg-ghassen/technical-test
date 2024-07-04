from django.db import models


# Create your models here.
class File(models.Model):
    file = models.FileField(upload_to='datasets')

    @property
    def file_url(self):
        return self.file.url if self.file is not None else ""

    def __str__(self):
        return self.file.name
