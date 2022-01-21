#!/bin/sh

pip install --upgrade pip
pip install --no-warn-script-location -r requirements.txt
# find . -type d -name migrations -exec rm -rf {} \;
# python manage.py makemigrations subscriptions users bstations bookings bikes travels
python manage.py migrate
DJANGO_SUPERUSER_PASSWORD="$ADMIN_PASSWORD" python manage.py createsuperuser --dni 12345678Z --email "$DEBUG_MAIL" --noinput
exec python manage.py runserver 0:8080
