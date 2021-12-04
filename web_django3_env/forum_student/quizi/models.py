from django.db import models
from form.models import User
# Create your models here.

class Exam(models.Model):
    title_exam      = models.CharField(max_length = 100)
    maker_exam      = models.ForeignKey(User, on_delete = models.CASCADE)
    create_time     = models.DateField(auto_now = True)
    number_of_times = models.IntegerField(default = 0)
    type_exam       = models.CharField(max_length = 50, default = 'all')

    def __str__(self):
        return self.title_exam

class Question(models.Model):
    question_of_exam = models.ForeignKey(Exam, on_delete = models.CASCADE)
    title_question   = models.CharField(max_length = 500)
    answer_a         = models.CharField(max_length = 200)
    answer_b         = models.CharField(max_length = 200)
    answer_c         = models.CharField(max_length = 200)
    answer_d         = models.CharField(max_length = 200)
    correct_answer   = models.CharField(max_length = 200)
    create_time      = models.DateTimeField(auto_now = True)
    @property
    def char_answer(self):
        if self.correct_answer == self.answer_a:
            return 'A'
        elif self.correct_answer == self.answer_b:
            return 'B'
        elif self.correct_answer == self.answer_c:
            return 'C'
        elif self.correct_answer == self.answer_d:
            return 'D'
        
    def __str__(self):
        return self.title_question

class Result(models.Model):
    result_of_user      = models.ForeignKey(User, on_delete = models.CASCADE)
    result_of_exam      = models.ForeignKey(Exam, on_delete = models.CASCADE)
    list_answer_wrong   = models.CharField(max_length = 200)
    total_answer        = models.IntegerField(default = 0)
    time_create         = models.DateTimeField(auto_now = True)
    @property
    def number_answer_wrong(self):
        my_list = self.list_answer_wrong.split('-')
        return len(my_list)
    def __str__(self):
        return 'Kết quả của {}'.format(self.result_of_user)