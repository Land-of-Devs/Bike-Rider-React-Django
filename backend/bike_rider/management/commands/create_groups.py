from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

STAFF_PERMS = {
    (
        'booking', 'travel', 'bike',
        'bstation', 'ticket', 'supportticket',
        'maintenanceticket', 'subscription',
        'coupon'
    ): ['view', 'change', 'add'],

    ('user', 'logentry', 'permission'): ['view']
}

class Command(BaseCommand):
    help = 'Creates a group for staff users'

    def handle(self, *args, **options):
        perm_list = []
        for models in STAFF_PERMS:
            perms = STAFF_PERMS[models]

            for model in models:
                for perm in perms:
                    perm_name = perm + '_' + model
                    try:
                        perm_instance = Permission.objects.get(codename=perm_name)
                        perm_list.append(perm_instance)
                    except Permission.DoesNotExist:
                        print("Permission not found with name '{}'.".format(perm_name))

        try:
            group_instance = Group.objects.create(
                name='Admins'
            )
            group_instance.permissions.set(perm_list)

            print("Created the Staff group and permissions.")
        except Exception as e:
            print(str(e))
