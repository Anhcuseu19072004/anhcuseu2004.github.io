from django.shortcuts import render
from form.models  import User
from quizi.models import Exam, Question, Result
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

# view quizi update questions for exam
# def quizi_update_questions(request, id):
#     info_user = request.COOKIES.get('user', None)
#     if info_user is None:
#         return redirect('register')

#     check_user_exists = User.objects.filter(pk = info_user).exists()
#     if check_user_exists is False:
#         return redirect('rigister')
#     user             = User.objects.get(pk = info_user)

#     check_exam_exits  = Exam.objects.filter(pk = id).exists()
#     if check_exam_exits is False:
#         return redirect('/quizi/home/quizi-dashboard/')

#     exam = Exam.objects.get(pk = id)
#     data = {
#         'user' : user,
#         'exam' : exam
#     }
#     return render(request, 'quizi/quizi_form_question.html', data)
    

