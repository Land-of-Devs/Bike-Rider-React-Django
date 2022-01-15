#!/bin/sh

#Perms
uid=`stat -c '%u' /app`
gid=`stat -c '%g' /app`

python -m pip install --upgrade pip
python manage.py runserver 0:8080
#exec /app-entrypoint.sh php artisan serve --host=0.0.0.0 --port=3000
