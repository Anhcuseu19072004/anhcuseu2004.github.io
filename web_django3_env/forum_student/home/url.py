from django.urls import path, re_path
from home import views as v_home
urlpatterns = [
    path('post-form/', v_home.post_form, name = 'post-form'),
    path('question-form/', v_home.question_form, name = 'question-form'),
    path('addpost/', v_home.addPost, name = 'addpost'),
    path('getPost/', v_home.getPost, name = 'getPost'),
    path('', v_home.home_page, name = 'home'),
    path('view-more/<int:id>', v_home.get_detail_post, name = 'view-more'),

    # API
    path('search/', v_home.search_post, name = 'search'),
    path('create-cmt/', v_home.create_comment, name = 'create_comment'),
]