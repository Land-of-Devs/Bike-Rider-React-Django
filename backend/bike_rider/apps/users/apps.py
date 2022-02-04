from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'bike_rider.apps.users'
    label = 'users'
    verbose_name = 'Users'

    def ready(self):
        import bike_rider.apps.users.signals
