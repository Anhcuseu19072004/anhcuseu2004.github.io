from django.urls import path, re_path
from quizi import views as v_quizi
from quizi import apis as a_quizi
urlpatterns = [
    # views
    path('home/', v_quizi.quizi_home, name = 'home-quizi'),
    path('home/quizi-dashboard/', v_quizi.quizi_user_dashboard, name = 'quizi-dashboard'),
    path('home/quizi-dashboard/quizi-form/', v_quizi.quizi_form, name = 'quizi-form'),
    path('home/quizi-dashboard/modify-exam/<int:id>', v_quizi.quizi_modify_exam, name = 'modify-exam'),
    path('home/quizi-dashboard/modify-exam/add-questions/<int:id>', v_quizi.quizi_create_questions, name = 'add-questions'),

    # API
    path('api/add-exam', a_quizi.api_add_exam, name = 'api-add-exam'),
    path('api/delete-exam', a_quizi.api_delete_exam, name = 'api-delete-exam'),
    path('api/update-exam', a_quizi.api_update_exam, name = 'api-update-exam'),
    path('api/add-question', a_quizi.api_add_question, name = 'api-add-question'),
    path('api/delete-question', a_quizi.api_delete_question, name = 'api-delete-question'),
]