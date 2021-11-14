from django.urls import path, re_path
from home import views as v_home
urlpatterns = [
    path('post-form/', v_home.post_form, name = 'post-form'),
    path('question-form/', v_home.question_form, name = 'question-form'),
    # path('getPost/', v_home.getPost, name = 'getPost'),
    path('', v_home.home_page, name = 'home'),
    path('view-more/<int:id>', v_home.get_detail_post, name = 'view-more'),
    path('view-question/<int:id>', v_home.question_detail, name = 'view-question'),
    path('user-dashboard/', v_home.user_dashboard, name = 'user-dashboard'),
    path('user-dashboard/edit/<str:type_object>/<int:id>', v_home.user_dashboard_edit, name = 'user-dashboard-edit'),

    # API
    # path('search/', v_home.search_post, name = 'search'),
    path('search/', v_home.search, name = 'search'),
    path('addpost/', v_home.addPost, name = 'addpost'),
    path('create-cmt/', v_home.create_comment, name = 'create_comment'),
    path('add-question/', v_home.add_question, name = 'add_question'),
    path('create-answer/', v_home.create_answer, name = 'create-answer'),
    path('delete-answer/', v_home.delete_answer, name = 'delete-answer'),
    path('delete-record/', v_home.delete_record, name = 'delete-record'),

    # special API
    path('modify-record/', v_home.update_record, name = 'modify-record')
]