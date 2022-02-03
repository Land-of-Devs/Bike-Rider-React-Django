from django.contrib import admin
from .models import MaintenanceTicket, SupportTicket, Ticket
from django.contrib.admin import ModelAdmin

class TicketAdmin(ModelAdmin):
    list_display = [f.name for f in Ticket._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Client', {'fields': ('client',)}),
        ('Info', {'fields': ('title','type','status', 'created_at')}),
    )
    add_fieldsets = (
        ('Client', {'fields': ('client',)}),
        ('Info', {'fields': ('title','type','status', 'created_at')}),
    )
    search_fields = ('type','client', 'status')
    ordering = ('type','status', 'client')

class MaintenanceTicketAdmin(ModelAdmin):

    list_display = [f.name for f in MaintenanceTicket._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Head', {'fields': ('ticket_head',)}),
        ('Object', {'fields': ('bike_id','station_id')}),
        ('Info', {'fields': ('type', 'message',)}),
    )
    add_fieldsets = (
        ('Head', {'fields': ('ticket_head',)}),
        ('Object', {'fields': ('bike_id','station_id')}),
        ('Info', {'fields': ('type', 'message',)}),
    )
    search_fields = ('ticket_head','bike_id','station_id')
    ordering = ('type','bike_id', 'station_id')

class SupportTicketAdmin(ModelAdmin):

    list_display = [f.name for f in SupportTicket._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Head', {'fields': ('ticket_head',)}),
        ('Info', {'fields': ('type', 'message',)}),
    )
    add_fieldsets = (
        ('Head', {'fields': ('ticket_head',)}),
        ('Info', {'fields': ('type', 'message',)}),
    )
    search_fields = ('ticket_head',)
    ordering = ('type','ticket_head')

admin.site.register(MaintenanceTicket, MaintenanceTicketAdmin)
admin.site.register(SupportTicket, SupportTicketAdmin)
admin.site.register(Ticket, TicketAdmin)