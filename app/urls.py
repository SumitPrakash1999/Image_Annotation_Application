from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('images/', views.image_list, name='image_list'),
    path('images/<str:pk>/annotate/', views.annotate_image, name='annotate_image'),
]
