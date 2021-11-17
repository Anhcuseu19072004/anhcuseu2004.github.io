from django.urls import path, re_path
from quizi import views as v_quizi
urlpatterns = [
    # path('view-discuss/<int:id>', v_home.view_discuss_post, name = 'view-discuss'),
    path('dashboard/', v_quizi.quizi_dashboard, name = 'dashboard')
]