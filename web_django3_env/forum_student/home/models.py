from django.db import models
from tinymce.models import HTMLField
from form.models import User
# Create your models here.
class Post(models.Model):
    user_of_post = models.ForeignKey(User, on_delete = models.CASCADE)
    title        = models.CharField(max_length = 200)
    content      = HTMLField() # model contein HTML
    post_time    = models.DateField(auto_now = True)
    post_img     = models.TextField()
    post_views   = models.IntegerField(default = 0)
    post_type    = models.CharField(max_length = 50, default = "all")
    @property
    def short_title(self):
        if len(str(self.title)) <= 43:
            return str(self.title)
        return str(self.title)[:40] + '...'

    def __str__(self):
        return self.title

class Comment(models.Model):
    post_id      = models.ForeignKey(Post, on_delete = models.CASCADE)
    content      = models.TextField()
    reply_time   = models.DateTimeField(auto_now = True)
    responders   = models.ForeignKey(User, on_delete = models.CASCADE)
    def __str__(self):
        return self.content

class Question(models.Model):
    question_title       = models.CharField(max_length = 500)
    question_discription = models.CharField(max_length = 1000)
    question_content     = HTMLField()
    question_time        = models.DateField(auto_now = True)
    user_of_question     = models.ForeignKey(User, on_delete = models.CASCADE)
    post_of_question     = models.CharField( max_length = 20, default = "none")
    question_img         = models.CharField(max_length = 50, default = "/media/background_item.png")
    def __str__(self):
        return self.question_title

class Answer(models.Model):
    user     = models.ForeignKey(User, on_delete = models.CASCADE)
    question = models.ForeignKey(Question, on_delete = models.CASCADE)
    content  = HTMLField()
    time     = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.user.pk



