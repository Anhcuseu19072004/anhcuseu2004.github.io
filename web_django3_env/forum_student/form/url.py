from django.urls import path
from form import views as form_v
urlpatterns = [
    path('register', form_v.register_form, name = 'register'),
    path('create-user', form_v.create_user, name = 'create_user'),
    path('login', form_v.login_app, name = 'login')
]