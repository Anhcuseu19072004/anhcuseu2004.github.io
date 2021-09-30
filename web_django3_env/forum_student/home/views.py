from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.db import connection
from home.models import Post, Question 
from form.models import User
from django.shortcuts import render, redirect

from django.views.decorators.csrf import csrf_exempt

"""TEST"""
# Create your views here.


""" FODER MEDIA CHỨA ẢNH"""
def post_form(request):
    return render(request, 'home/post_form.html')


def addPost(request):
    if request.method == 'POST':
        heading = request.POST['label']
        content_ = request.POST["textarea"]
        user = User.objects.get(account_name = 'admin@gg.gg', password = '1')
        a = Post(title = heading, content = content_, user_of_post = user)
        a.save()
        del a 
        return HttpResponse(content_)

def getPost(request):
    if request.method == 'GET':
        all_pro = Post.objects.all()
        data = serializers.serialize('json', all_pro, fields=('title','content', 'post_time'))
        return JsonResponse(data, safe = False)
    elif request.method == 'PUT':
        return HttpResponse('con cac')

def home_page(request):
    if request.COOKIES.get('user', None) == None:
        return redirect('register')
    else:
        print(request.COOKIES['user'])
        user_cookie = request.COOKIES['user']
    info_user     = User.objects.get(account_name = user_cookie) 
    list_post     = Post.objects.all()
    list_question = Question.objects.all()

    return render(request, 'home/home.html',{
        'list_post'     : list_post,
        'list_question' : list_question,
        'info_user'     : info_user
    })

@csrf_exempt
def search_post(request):
    search_key = request.POST['key']
    myPost = Post.objects.all()
    my_result = []
    for i in myPost:
        if search_key in str(i.title).lower():
            my_result.append(i)
    data = serializers.serialize('json', my_result, fields=('user_of_post', 'title','content', 'post_time', 'post_img'))

    del search_key
    del myPost
    del my_result
    return JsonResponse(data, safe = False)
