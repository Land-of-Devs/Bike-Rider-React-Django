from django.contrib import admin
from .models import Coupon
from django.contrib.admin import ModelAdmin

class CouponAdmin(ModelAdmin):
    list_display = [f.name for f in Coupon._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Coupon', {'fields': ('code','minutes', 'uses')}),
    )
    add_fieldsets = (
        ('Coupon', {'fields': ('code','minutes', 'uses')}),
    )
    search_fields = ('code',)
    ordering = ('minutes','uses')

admin.site.register(Coupon, CouponAdmin)