from django.db import models

# Create your models here.
class User(models.Model):
    account_name = models.CharField(max_length = 100, primary_key = True)
    password     = models.CharField(max_length = 100)
    user_img     = models.TextField()
    def __str__(self):
        return self.account_name
