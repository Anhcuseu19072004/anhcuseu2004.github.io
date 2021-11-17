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

    return render(request, 'quizi/quizi_dashboard.html')



