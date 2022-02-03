from django.contrib import admin
from .models import Bike
from django.contrib.admin import ModelAdmin

class BikeAdmin(ModelAdmin):

    list_display = [f.name for f in Bike._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Location', {'fields': ('station',)}),
        ('Maintenance', {'fields': ('status','last_check')}),
    )
    add_fieldsets = (
        ('Location', {'fields': ('station',)}),
        ('Maintenance', {'fields': ('status','last_check')}),
    )
    search_fields = ('status','last_check')
    ordering = ('last_check',)

admin.site.register(Bike, BikeAdmin)