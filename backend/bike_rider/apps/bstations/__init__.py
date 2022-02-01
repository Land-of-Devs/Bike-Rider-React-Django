from django.apps import AppConfig

class BStationsAppConfig(AppConfig):
    name = 'bike_rider.apps.bstations'
    label = 'bstations'
    verbose_name = 'Bike Stations'

    def ready(self):
        import bike_rider.apps.bstations.signals

default_app_config = 'bike_rider.apps.bstations.BStationsAppConfig'
