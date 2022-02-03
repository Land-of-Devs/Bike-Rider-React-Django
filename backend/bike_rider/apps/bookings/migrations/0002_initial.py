# Generated by Django 4.0.2 on 2022-02-03 20:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bstations', '0001_initial'),
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='station',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booking', to='bstations.bstation'),
        ),
    ]
