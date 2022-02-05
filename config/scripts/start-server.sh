#!/bin/sh

python manage.py migrate
python manage.py create_groups
DJANGO_SUPERUSER_PASSWORD="$ADMIN_PASSWORD" python manage.py createsuperuser --dni "$ADMIN_DNI" --email "$ADMIN_EMAIL" --role "ADMIN" --noinput
exec python manage.py runserver 0:8080