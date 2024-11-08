from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import ProjectSerializer
from .models import Project
# Create your views here.
def home(request):
    return HttpResponse("Hello World!")

class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    def list(self, request):
        queryset = self.queryset
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    def update(self, request, pk=None):
        Project = self.queryset.get(pk=pk)
        serializer = ProjectSerializer(Project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    def partial_update(self, request, pk=None):
        Project = self.queryset.get(pk=pk)
        serializer = ProjectSerializer(Project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        Project = self.queryset.get(pk=pk)
        Project.delete()
        return Response(status=204)