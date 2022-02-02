# Generated by Django 4.0.2 on 2022-02-02 18:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bstations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bstation',
            name='maintainer',
            field=models.ForeignKey(blank=True, limit_choices_to={'role': 'MAINTENANCE'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bstation', to=settings.AUTH_USER_MODEL),
        ),
    ]
