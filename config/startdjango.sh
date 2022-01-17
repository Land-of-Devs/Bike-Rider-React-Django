#!/bin/sh

#Perms
uid=`stat -c '%u' /app`
gid=`stat -c '%g' /app`


pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
DJANGO_SUPERUSER_PASSWORD="$ADMIN_PASSWORD" python manage.py createsuperuser --username admin --email "$DEBUG_MAIL" --noinput
exec python manage.py runserver 0:8080
#exec /app-entrypoint.sh php artisan serve --host=0.0.0.0 --port=3000
