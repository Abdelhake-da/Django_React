from django.urls import path
from .views import home, ProjectViewSet, ProjectManagerViewSet
from rest_framework.routers import DefaultRouter
app_name = 'api'
router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename='project')
router.register(r'project_manager', ProjectManagerViewSet, basename='project_manager')
urlpatterns = router.urls

