from django.urls import path, re_path
from quizi import views as v_quizi
urlpatterns = [
    path('home/', v_quizi.quizi_home, name = 'home-quizi'),
    path('home/quizi-dashboard/', v_quizi.quizi_user_dashboard, name = 'quizi-dashboard')
]