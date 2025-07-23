# certifications/models.py

from django.db import models

class Certificate(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_issued = models.DateField()
    image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.title