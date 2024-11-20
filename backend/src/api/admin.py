from django.contrib import admin
from .models import Project, ProjectManager, Employees
# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'comments', 'start_date', 'end_date', 'status')
    list_filter = ('name', 'comments', 'start_date', 'end_date', 'status')
    search_fields = ('name', 'comments', 'start_date', 'end_date', 'status')
    ordering = ('name', 'comments', 'start_date', 'end_date', 'status')
    # date_hierarchy = 'start_date'
    # list_per_page = 25
    # list_max_show_all = 100
    # list_editable = ('comments', 'start_date', 'end_date', 'status')
    # list_display_links = ('name',)
    # list_select_related = True
    # list_prefetch_related = True
    # list_per_page = 25
    # list_max_show_all = 100
    # list_editable = ('employees', 'status')
    # list_display_links = ('name',)
    # list_select_related = True
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectManager)
admin.site.register(Employees)