from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/',views.register),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('logout/', views.logout),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customers/', views.New_Customer.as_view()),
    path('customers/<int:pk>/', views.New_Customer.as_view()),
    path('treatments/', views.TreatmentView.as_view()),
    path('treatments/<int:pk>/', views.TreatmentView.as_view()),
    path('appointments/', views.AppointmentView.as_view()),
    path('appointments/<int:pk>/', views.AppointmentView.as_view()),
    path('products/', views.ProductView.as_view()),
    path('products/<int:pk>/', views.ProductView.as_view()),
    path('get_users', views.get_users),

]
