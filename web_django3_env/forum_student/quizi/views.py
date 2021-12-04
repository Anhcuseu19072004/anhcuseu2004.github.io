from django.shortcuts import render, redirect
from form.models  import User
from quizi.models import Exam, Question, Result
import random
from quizi.core import get_list_question
# Create your views here.
# view quizi home
def quizi_home(request):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')
    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    # get data to render
    user       = User.objects.get(pk = info_user)
    list_quizi = Exam.objects.all().order_by('-create_time')
    data = {
        'user'       : user,
        'list_quizi' : list_quizi,
    }
    return render(request, 'quizi/quizi_home.html', data)

# view quizi user dashboard
def quizi_user_dashboard(request):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user       = User.objects.get(pk = info_user)
    list_quizi = Exam.objects.filter(maker_exam = user).order_by('-create_time')
    data = {
        'user'       : user,
        'list_quizi' : list_quizi
    }

    return render(request, 'quizi/quizi_dashboard.html', data)

# view quizi form
def quizi_form(request):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user       = User.objects.get(pk = info_user)
    
    data = {
        'user'    : user
    }
    return render(request, 'quizi/quizi_form.html', data)

# view quizi modify exam (remove question for exam and change exam)
def quizi_modify_exam(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)
    check_exam_exits = Exam.objects.filter(pk = id).exists()
    if check_exam_exits is False:
        return redirect('/quizi/home/quizi-dashboard/')
    exam          = Exam.objects.get(pk = id)
    if exam.maker_exam != user:
        return redirect('/quizi/home/quizi-dashboard/')
    list_question = Question.objects.filter(question_of_exam = exam)
    data = {
        'user'          : user,
        'exam'          : exam,
        'list_question' : list_question,
    }

    return render(request, 'quizi/quizi_modify_exam.html', data)

# view quizi create questions for exam
def quizi_create_questions(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)

    check_exam_exits  = Exam.objects.filter(pk = id).exists()
    if check_exam_exits is False:
        return redirect('/quizi/home/quizi-dashboard/')

    exam = Exam.objects.get(pk = id)
    data = {
        'user' : user,
        'exam' : exam
    }
    return render(request, 'quizi/quizi_form_question.html', data)

# view quizi modify question
def quizi_modify_questions(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)

    check_question_exists = Question.objects.filter(pk = int(id)).exists()
    if check_question_exists is False:
        return redirect('/quizi/home/quizi-dashboard/')

    def check_correct_answer(oj, correct_answer):
        if oj.answer_a == correct_answer:
            return 'A'

        elif oj.answer_b == correct_answer:
            return 'B'

        elif oj.answer_c == correct_answer:
            return 'C'

        elif oj.answer_d == correct_answer:
            return 'D'

    question = Question.objects.get(pk = int(id))
    if question.question_of_exam.maker_exam != user:
        return redirect('/quizi/home/quizi-dashboard/')
    data = {
        'user'           : user,
        'question'       : question,
        'correct_answer' : check_correct_answer(question, question.correct_answer)
    }

    return render(request, 'quizi/quizi_modify_question.html', data)

    



# 
#               START
#=============  EXAM  =============
#
#

#view introduction for exam
def quizi_intro(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)
    check_exam_exits = Exam.objects.filter(pk = int(id)).exists()

    if check_exam_exits is False: 
        return redirect('/quizi/home/')

    exam           = Exam.objects.get(pk = int(id))
    total_question = len(list(Question.objects.filter(question_of_exam = exam)))

    data = {
        'user'           : user,
        'exam'           : exam,
        'total_question' : total_question
    }

    return render(request, 'quizi/quizi_intro.html', data)

# view start exam
def quizi_start(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)
    check_exam_exits = Exam.objects.filter(pk = int(id))
    if check_exam_exits is False:
        return redirect('/quizi/home/')

    exam          = Exam.objects.get(pk = int(id))
    list_question = list(Question.objects.filter(question_of_exam = exam))
    random.shuffle(list_question)
    data = {
        'user'          : user,
        'exam'          : exam,
        'list_question' : list_question
    }

    return render(request, 'quizi/quizi_start.html', data)

# view result exam
def quizi_result(request, id):
    info_user = request.COOKIES.get('user', None)
    if info_user is None:
        return redirect('register')

    check_user_exists = User.objects.filter(pk = info_user).exists()
    if check_user_exists is False:
        return redirect('rigister')
    user             = User.objects.get(pk = info_user)

    check_result_exists    = Result.objects.filter(pk = int(id))
    if check_result_exists is False:
        return redirect('/quizi/home/')

    result        = Result.objects.get(pk = int(id))
    if result.list_answer_wrong == 'none':
        total_answer_is_true = result.total_answer
        render_question      = 'False'
        data = {
            'user'                 : user,
            'total_answer_is_true' : total_answer_is_true,
            'render_question'      : 'False',
            'result'               : result
        }
        return render(request, 'quizi/quizi_result.html', data)
    else:
        list_id       = [int(x) for x in result.list_answer_wrong.split('-')]
        list_question = get_list_question(list_id)
        total_answer_is_true = int(result.total_answer) - int(result.number_answer_wrong)
        print(list_question[0])
        data = {
            'user'                 : user,
            'list_question'        : list_question,
            'result'               : result,
            'total_answer_is_true' : total_answer_is_true,
            'render_question'      : 'True'
        }
        
        return render(request, 'quizi/quizi_result.html', data)
    
