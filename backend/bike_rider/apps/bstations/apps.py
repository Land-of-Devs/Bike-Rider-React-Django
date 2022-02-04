from django.apps import AppConfig

class BStationsConfig(AppConfig):
    name = 'bike_rider.apps.bstations'
    label = 'bstations'
    verbose_name = 'Bike Stations'
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        import bike_rider.apps.bstations.signals
