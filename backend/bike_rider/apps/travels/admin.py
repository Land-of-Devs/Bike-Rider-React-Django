from django.contrib import admin
from .models import Travel
from django.contrib.admin import ModelAdmin

class TravelAdmin(ModelAdmin):
    list_display = [f.name for f in Travel._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Client', {'fields': ('user',)}),
        ('Bike', {'fields': ('bike',)}),
        ('Starts', {'fields': ('start','origin',)}),
        ('Finish', {'fields': ('finish','destination',)}),
    )
    add_fieldsets = (
        ('Client', {'fields': ('user',)}),
        ('Bike', {'fields': ('bike',)}),
        ('Starts', {'fields': ('start','origin',)}),
        ('Finish', {'fields': ('finish','destination',)}),
    )
    search_fields = ('bike','client', 'origin', 'destination',)
    ordering = ('user', 'start', 'bike', 'origin', 'destination',)

admin.site.register(Travel, TravelAdmin)