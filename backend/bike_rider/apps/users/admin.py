from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AdminPanel
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User

class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        exclude = ('last_name','date_joined', 'first_name', 'is_active', 'username', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        exclude = ('last_name','date_joined', 'first_name', 'is_active', 'username',)

    def clean_password(self):
        return self.initial["password"]


class UserAdmin(AdminPanel):
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = [f.name for f in User._meta.fields]
    list_filter = ()
    fieldsets = (
        ('Account', {'fields': ('email', 'password', 'dni', 'last_login','subscription')}),
        ('Permissions', {'fields': ('is_superuser','role')}),
    )
    add_fieldsets = (
        ('Account', {'fields': ('email', 'password', 'dni', 'last_login','subscription')}),
        ('Permissions', {'fields': ('is_superuser','role')}),
    )
    search_fields = ('email','dni')
    ordering = ('dni',)

admin.site.register(User, UserAdmin)