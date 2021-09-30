from django.urls import path
from home import views as v_home
urlpatterns = [
    path('post-form/', v_home.post_form, name = 'post-form'),
    path('addpost/', v_home.addPost, name = 'addpost'),
    path('getPost/', v_home.getPost, name = 'getPost'),
    path('', v_home.home_page, name = 'home'),
    path('search/', v_home.search_post, name = 'addquestion'),
    
]