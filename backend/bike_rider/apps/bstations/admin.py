from django.contrib import admin
from .models import BStation
from django.contrib.admin import ModelAdmin

class BStationAdmin(ModelAdmin):

    list_display = [f.name for f in BStation._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Info', {'fields': ('name','lat','lon','image')}),
        ('Maintenance', {'fields': ('maintainer','nslots','ip')}),
    )
    add_fieldsets = (
         ('Info', {'fields': ('name','lat','lon','image')}),
        ('Maintenance', {'fields': ('maintainer','nslots','ip')}),
    )
    search_fields = ('name','maintainer','ip')
    ordering = ('name','maintainer', 'ip')

admin.site.register(BStation, BStationAdmin)