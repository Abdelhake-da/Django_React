from django.db import models

class ProjectManager(models.Model):
    name = models.CharField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
class Employees(models.Model):
    name = models.CharField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
class Project(models.Model):
    name = models.CharField(max_length=100,unique=True)
    employees = models.ManyToManyField(Employees, blank=True)
    project_manager = models.ForeignKey(ProjectManager, on_delete=models.CASCADE, null=True, blank=True)
    comments = models.TextField(max_length=500,blank=True , null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
