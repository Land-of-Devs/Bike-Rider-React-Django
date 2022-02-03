# Generated by Django 4.0.2 on 2022-02-03 16:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tickets', '0001_initial'),
        ('bikes', '0002_initial'),
        ('bstations', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ticket', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='supportticket',
            name='ticket_head',
            field=models.ForeignKey(limit_choices_to={'type': 'SUPPORT'}, on_delete=django.db.models.deletion.CASCADE, related_name='support_ticket', to='tickets.ticket'),
        ),
        migrations.AddField(
            model_name='maintenanceticket',
            name='bike_id',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='maintenance_ticket', to='bikes.bike'),
        ),
        migrations.AddField(
            model_name='maintenanceticket',
            name='station_id',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='maintenance_ticket', to='bstations.bstation'),
        ),
        migrations.AddField(
            model_name='maintenanceticket',
            name='ticket_head',
            field=models.ForeignKey(limit_choices_to={'type': 'MAINTENANCE'}, on_delete=django.db.models.deletion.CASCADE, related_name='maintenance_ticket', to='tickets.ticket'),
        ),
    ]
