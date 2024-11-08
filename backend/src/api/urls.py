from django.urls import path
from .views import home, ProjectViewSet
from rest_framework.routers import DefaultRouter
app_name = 'api'
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = router.urls
