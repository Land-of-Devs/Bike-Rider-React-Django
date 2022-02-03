from django.contrib import admin
from .models import Subscription
from django.contrib.admin import ModelAdmin

class SubscriptionAdmin(ModelAdmin):

    list_display = [f.name for f in Subscription._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Name', {'fields': ('name',)}),
        ('Prices', {'fields': ('min_minutes','cent_minute')}),
    )
    add_fieldsets = (
        ('Name', {'fields': ('name',)}),
        ('Prices', {'fields': ('min_minutes','cent_minute')}),
    )
    search_fields = ('cent_minute','name')
    ordering = ('name','cent_minute')

admin.site.register(Subscription, SubscriptionAdmin)