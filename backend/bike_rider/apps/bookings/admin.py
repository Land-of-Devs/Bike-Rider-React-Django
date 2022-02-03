from django.contrib import admin
from .models import Booking
from django.contrib.admin import ModelAdmin

class BookingAdmin(ModelAdmin):

    list_display = [f.name for f in Booking._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Entities', {'fields': ('user','station')}),
        ('Reservetion', {'fields': ('time_start','time_end')}),
    )
    add_fieldsets = (
        ('Entities', {'fields': ('user','station')}),
        ('Reservetion', {'fields': ('time_start','time_end')}),
    )
    search_fields = ('user','station')
    ordering = ('time_end','station')

admin.site.register(Booking, BookingAdmin)