# Generated by Django 3.0.2 on 2022-01-24 17:32

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bstations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('OK', 'ok'), ('REPAIRING', 'repairing'), ('UNAVALIBALE', 'unavaliable')], max_length=32)),
                ('last_check', models.DateTimeField(default=django.utils.timezone.now)),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bstations.BStation')),
            ],
        ),
    ]
