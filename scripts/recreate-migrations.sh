#!/bin/bash
set -euo pipefail

find backend/bike_rider -type d -name migrations -exec find {} -type f ! -name '*NODEL*' ! -name '__init__.py' -delete -print \;
docker exec -itu "$UID" br_django python manage.py makemigrations subscriptions users bstations bookings bikes travels tickets coupons
docker-compose down -t 1
