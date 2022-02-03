# Generated by Django 4.0.2 on 2022-02-03 20:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('OK', 'ok'), ('REPAIRING', 'repairing'), ('UNAVAILABLE', 'unavaliable')], max_length=32)),
                ('last_check', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
