from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name="root"),
    path('home/',views.home, name='home'),
    path('register/',views.register, name='register'),
    path('login/', views.userlogin, name='login'),
    path('api/usernames/', views.usernames, name='usernames'),
    path('registrations/', views.registrations, name='registrations'),
    path('dashboard/',views.dashboard,name='dashboard')
    ,
    # Task API
    path('api/tasks/', views.tasks_api, name='tasks_api'),
    path('api/tasks/<int:pk>/toggle/', views.task_toggle, name='task_toggle'),
    path('api/tasks/<int:pk>/delete/', views.task_delete, name='task_delete'),
    path('api/tasks/<int:pk>/edit/', views.task_update, name='task_update'),
]