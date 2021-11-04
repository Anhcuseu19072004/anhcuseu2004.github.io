from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from form.models import User
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def register_form(request):
    return render(request, 'form/form_register.html')

def create_user(request):
    if request.method == 'POST':
        account_  = request.POST['account']
        password = request.POST['password']
        if User.objects.filter(account_name = account_).exists():
            acc_exist = 3

            del account_
            del password
            return render(request, 'form/form_register.html', {
                'acc_exist': acc_exist
            })
        else:
            User.objects.create(account_name = account_, password = password)
            script = "vui long doi<script>setTimeout(function() { window.location.replace('/login');}, 2)</script>"
            response = HttpResponse(script)
            response.set_cookie("user", str(account_))

            del script
            return response

        return HttpResponse('cai deo gi')
def login_app(request):

    if request.method == 'POST':
        account  = request.POST['nickname']
        password = request.POST['password']

        if User.objects.filter(account_name = account).exists():
            user = User.objects.get(account_name = account)
            if user.password == password:
                script = "vui long doi<script>setTimeout(function() { let host = window.location.host; window.location.replace('/home/');}, 2)</script>"
                response = HttpResponse(script)
                response.set_cookie("user", str(user.account_name))
                print('da chay den day')
                del script
                del account
                del password
                return response
            else:
                print('sai mat khau')
                del account
                del password
                return render(request, 'form/form_login.html', {
                'message' : 1
            })
        else:
            print('tai khoang khong ton tai')
            del account
            del password
            return render(request, 'form/form_login.html', {
                'message' : 2
            })

    return render(request, 'form/form_login.html')


