from form.models  import User
from quizi.models import Exam, Question, Result
from quizi.common_quizi import check_correct_answer
import json
from django.views.decorators.csrf import csrf_exempt, csrf_protect, requires_csrf_token
from django.http import HttpResponse, JsonResponse
from django.core import serializers

# quizi api create exam
@csrf_exempt
def api_add_exam(request):
    if request.method == "POST":
        body             = json.loads(request.body)
        info_user        = body['user']
        check_user_exist = User.objects.filter(pk = info_user).exists()
        if check_user_exist is False:
            return JsonResponse({
                'status'  : 'BAD',
                'message' : 'user is not exits'
            })
        user = User.objects.get(pk = info_user)
        title_exam       = body['title']
        type_exam        = body['type']
        
        exam = Exam(title_exam = title_exam, maker_exam = user, type_exam = type_exam)
        exam.save()
        return JsonResponse({
            'status'   : "OK",
            'message'  : "successfully",
            'exam_id'  : "{}".format(exam.pk)
        })

# quizi api delete exam
@csrf_exempt
def api_delete_exam(request):
    if request.method == "DELETE":
        body    = json.loads(request.body)
        id_exam = body['id_exam']
        check_exam_exists = Exam.objects.filter(pk = int(id_exam)).exists()
        if check_exam_exists is False:
            return JsonResponse({
                'status'  : 'BAD',
                'message' : 'exam is not exits'
            })
        exam = Exam.objects.get(pk = int(id_exam))
        exam.delete()
        return JsonResponse({
            'status'  : 'OK',
            'message' : 'successfully'
        })

# quizi api update exam
@requires_csrf_token
def api_update_exam(request):
    if request.method == "PUT":
        body      = json.loads(request.body)
        id_exam   = body['examId']
        new_title = body['titleExam']
        new_type  = body['typeExam']

        check_exam_exists = Exam.objects.filter(pk = int(id_exam)).exists()
        if check_exam_exists is False:
            return JsonResponse({
                'status'  : 'BAD',
                'message' : 'exam is not exists'
            })

        exam            = Exam.objects.get(pk = int(id_exam))
        exam.title_exam = new_title
        exam.type_exam  = new_type
        exam.save()
        return JsonResponse({
            'status'  : 'OK',
            'message' : 'successfully'
        })

# quizi api create question
@requires_csrf_token
def api_add_question(request):
    if request.method == "POST":
        body           = json.loads(request.body)
        exam_id        = body['exam_id']
        title_question = body['title']
        answer_A       = body['answer_A']
        answer_B       = body['answer_B']
        answer_C       = body['answer_C']
        answer_D       = body['answer_D']
        answer_correct = body['answer_correct']

        check_exam_exists = Exam.objects.filter(pk = int(exam_id)).exists()
        if check_exam_exists is False:
            return JsonResponse({
                'status'  : "BAD",
                'message' : "exam is not exists"
            })
        exam = Exam.objects.get(pk = int(exam_id))

        new_question = Question(question_of_exam = exam,
                                title_question   = title_question,
                                answer_a         = answer_A,
                                answer_b         = answer_B,
                                answer_c         = answer_C,
                                answer_d         = answer_D,
                                correct_answer   = answer_correct
                                )
        new_question.save()
        return JsonResponse({
                'status'  : "OK",
                'message' : "successfully"
            })
# quizi api delete question
@requires_csrf_token
def api_delete_question(request):
    if request.method == "DELETE":
        body        = json.loads(request.body)
        question_id = body['questionId']

        check_question_exists = Question.objects.filter(pk = question_id).exists()
        if check_question_exists is False:
            return JsonResponse({
                'status'  : 'BAD',
                'message' : 'question is not exits'
            })

        question = Question.objects.get(pk = question_id)
        question.delete()
        return JsonResponse({
            'status'  : 'OK',
            'message' : 'successfully'
        })

# quizi api modify question
@requires_csrf_token
def api_modify_question(request):
    if request.method == "PUT":
        body                  = json.loads(request.body)
        question_id           = body['question_id']
        check_question_exists = Question.objects.filter(pk = int(question_id)).exists()
        if check_question_exists is False:
            return JsonResponse({
                'status'  : 'BAD',
                'message' : 'question is not exists'
            })

        question       = Question.objects.get(pk = int(question_id))
        new_title      = body['title']
        answer_A       = body['answer_A']
        answer_B       = body['answer_B']
        answer_C       = body['answer_C']
        answer_D       = body['answer_D']
        answer_correct = body['answer_correct']

        if answer_correct == "not_modify":
            question.title_question = new_title
            if check_correct_answer(question, question.correct_answer) == "A":
                question.correct_answer = answer_A

            elif check_correct_answer(question, question.correct_answer) == "B":
                question.correct_answer = answer_B

            elif check_correct_answer(question, question.correct_answer) == "C":
                question.correct_answer = answer_C

            elif check_correct_answer(question, question.correct_answer) == "D":
                question.correct_answer = answer_D

            
            question.answer_a       = answer_A
            question.answer_b       = answer_B
            question.answer_c       = answer_C
            question.answer_d       = answer_D

            question.save()
            return JsonResponse({
                'status'  : "OK",
                'message' : "successfully"
            })
            
        question.title_question = new_title
        question.answer_a       = answer_A
        question.answer_b       = answer_B
        question.answer_c       = answer_C
        question.answer_d       = answer_D
        question.correct_answer = answer_correct
        question.save()

        return JsonResponse({
            'status'  : "OK",
            'message' : "successfully"
        })
