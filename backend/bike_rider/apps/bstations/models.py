import datetime

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator
from django.db.models import Count, Q, F, Subquery, OuterRef

from bike_rider.apps.users.models import User

class BStation(models.Model):
    name = models.CharField(max_length=32)
    lat = models.FloatField(validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    lon = models.FloatField(validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    image = models.FileField(upload_to='img/stations', validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])])
    maintainer = models.ForeignKey(User, limit_choices_to={'role':'MAINTENANCE'}, related_name='bstation', on_delete=models.SET_NULL, null=True, blank=True)
    nslots = models.IntegerField(validators=[MinValueValidator(1)])
    ip = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return self.name

    def annotate_slot_info(queryset):
        return queryset.annotate(
            av_slots=F('nslots') - Count('bike'),
            bk_bike_ct=Subquery(
                BStation.objects.filter(
                    pk=OuterRef('pk')
                ).annotate(
                    bk_bike_ct=Count(
                        'booking',
                        filter=Q(booking__time_end__gt=datetime.datetime.today()))
                ).values('bk_bike_ct')),
            av_bike_ct=Count(
                'bike',
                filter=Q(bike__status='OK')
            ) - F('bk_bike_ct'), # not great, repeats query
        )

    def annotate_maint_ticket_ct(queryset):
        return queryset.annotate(
            maint_ticket_ct=Subquery(
                BStation.objects.filter(
                    pk=OuterRef('pk')
                ).annotate(
                    maint_ticket_ct=Count(
                        'maintenance_ticket__ticket_head',
                        filter=Q(
                            maintenance_ticket__ticket_head__status='PENDING')
                    )
                ).values('maint_ticket_ct')
            )
        )
