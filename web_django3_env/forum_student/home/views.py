from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.db import connection
from home.models import Post, Question, Comment, Answer
from form.models import User
from django.shortcuts import render, redirect
import json
from django.views.decorators.csrf import csrf_exempt
from home.luongson import saveImg

"""TEST"""
# Create your views here.


""" FODER MEDIA CHỨA ẢNH"""
    

# def getPost(request):
#     if request.COOKIES.get('user', None) == None:
#         return redirect('register')
#     if request.method == 'GET':
#         all_pro = Post.objects.all()
#         data = serializers.serialize('json', all_pro, fields=('title','content', 'post_time'))
#         return JsonResponse(data, safe = False)
#     elif request.method == 'PUT':
#         return HttpResponse('page is not foud')



# view page home
def home_page(request):
    if request.COOKIES.get('user', None) == None:
        return redirect('register')
    else:
        print(request.COOKIES['user'])
        user_cookie = request.COOKIES['user']
    info_user     = User.objects.get(account_name = user_cookie) 
    list_post     = Post.objects.all().order_by('-post_views')
    list_question = Question.objects.all()

    return render(request, 'home/home.html',{
        'list_post'     : list_post,
        'list_question' : list_question,
        'info_user'     : info_user
    })



# view post detail
def get_detail_post(request, id):
    user_info = request.COOKIES.get('user', None)
    if (user_info == None):
        return redirect('register')
    user = User.objects.get(account_name = user_info)
    post = Post.objects.get(pk = id)
    post.post_views += 1
    post.save()
    list_cmt = Comment.objects.filter(post_id = id).order_by('-reply_time')
    count_cmt = len(list_cmt)
    data = {
        'post' : post,
        'user' : user,
        'list_cmt' : list_cmt,
        'count_cmt' : count_cmt
    }
    return render(request, 'home/post_detail.html',data)

# view post form
def post_form(request):
    user_info = request.COOKIES.get('user', None)
    if user_info == None:
        return redirect('http://127.0.0.1:8000/')
    else:
        user = User.objects.get(account_name = user_info)
        data = {
            'user' : user
        }
    return render(request, 'home/post_form.html', data)

# views question form
def question_form(request):
    user_info = request.COOKIES.get('user', None)
    if user_info is None:
        return redirect('register')
    user = User.objects.get(pk = user_info)
    data = {
        'user' : user
    }

    return render(request, 'home/question_form.html', data)


# view question detail
def question_detail(request, id):
    user_info = request.COOKIES.get('user', None)

    if user_info is None:
        return redirect('register')
    
    user     = User.objects.get(pk = user_info)
    question = Question.objects.get(pk = id)
    answer   = Answer.objects.filter(question = question.pk)
    if question.post_of_question == 'none':
        data = {
            'user'     : user,
            'question' : question,
            'check'    : 0,
            'answer'   : answer
        }

        return render(request, 'home/question_detail.html', data)
    post     = Post.objects.get(pk = int(question.post_of_question))
    data = {
        'user'     : user,
        'question' : question,
        'post'     : post,
        'check'    : 1,
        'answer'   : answer
    }
    return render(request, 'home/question_detail.html', data)


# ======     API    ======
@csrf_exempt
def addPost(request):
    if request.method == 'POST':
        try:

            body = json.loads(request.body)
            my_content = body['content_']
            my_title = body['title_']
            my_img   = body['file_']
            name_img = body['name_file_']
            name_img = name_img.replace(' ', "-")
            my_img   = saveImg(my_img, name_img).replace('\\', "/")
            user_info = request.COOKIES.get('user', None)
            user = User.objects.get(account_name = user_info)

            new_post = Post(user_of_post = user, title = my_title, content = my_content, post_img = my_img)
            new_post.save()

            return JsonResponse({"message": 'thành công', 'status': 'OK'}, safe = False)
        except Exception as e:
            return JsonResponse({'message': str(e), 'status': 'BAD'})

@csrf_exempt
def add_question(request):
    if request.method == "POST":
        try:

            body           = json.loads(request.body)
            my_title       = body['title']
            my_content     = body['content']
            my_discription = body['discription']
            my_tag         = body['tag'] 

            user_info  = request.COOKIES.get('user', None)
            if user_info is None:
                return JsonResponse({
                    'message' : 'user is not define',
                    'status'  : 'BAD'
                })
            
            user = User.objects.get(pk = user_info)

            if my_tag != 'none':
                post     = Post.objects.get(pk = int(my_tag))
                my_title = "Câu hỏi của {} về bài viết : \" {} \"".format(user, post)
                new_question = Question(question_title = my_title, question_discription = my_discription, question_content = my_content, post_of_question = my_tag, user_of_question = user)
                new_question.save()
                return JsonResponse({
                    'message' : 'successfuly',
                    'status'  : 'OK'
                })
            new_question = Question(question_title = my_title, question_discription = my_discription, question_content = my_content, post_of_question = my_tag, user_of_question = user)
            new_question.save()

            print(new_question)
            return JsonResponse({
                'message' : '{}'.format(new_question),
                'status'  : 'OK'
            })
        except Exception as e:
            return JsonResponse({
                    'message' : '{}'.format(e),
                    'status'  : 'BAD'
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

@csrf_exempt
def create_comment(request):
    user_info = request.COOKIES.get('user', None)
    if user_info is None:
        return JsonResponse({
            'statsus': 0,
            'message': 'user is not define'
            })
    body = json.loads(request.body)
    user = User.objects.get(pk = user_info)
    post = Post.objects.get(pk = body['id'])
    new_cmt = Comment(post_id = post, content = body['contentCmt'], responders = user)
    new_cmt.save()

    return JsonResponse({
        'status' : 1,
        'message': 'succecfully'
    })
@csrf_exempt
def create_answer(request):
    user_info = request.COOKIES.get('user', None)

    if user_info is None:
        return JsonResponse({
            'status'  : 'BAD',
            'message' : "user is not define"
        })
    
    user     = User.objects.get(pk = user_info)
    body     = json.loads(request.body)
    question = Question.objects.get(pk = int(body['id'])) 
    content_answer = body['content']

    new_answer = Answer(user = user, question = question, content = content_answer)
    new_answer.save()

    return JsonResponse({
        'status'  : "OK",
        'message' : "successfuly"
    })

@csrf_exempt
def delete_answer(request):
    try:
        body        = json.loads(request.body)
        id_answer   = body['id']
        answer      = Answer.objects.get(pk = int(id_answer))
        answer.delete()

        return JsonResponse({
            'status'  : 'OK',
            'message' : 'successfuly'
        })
    except Exception as e:
        return JsonResponse({
            'status'  : 'BAD',
            'message' : '{}'.format(e)
        })