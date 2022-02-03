from django.apps import AppConfig

class CoreConfig(AppConfig):
    name = 'bike_rider.apps.core'
    verbose_name = "My Application"
    def ready(self):
            from .threads import start_threads
            start_threads()
