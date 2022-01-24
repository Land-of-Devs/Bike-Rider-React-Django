#!/bin/bash
set -euo pipefail

find backend/bike_rider -type d -name migrations -exec rm -rf {} \; || true
docker exec -itu "$UID" br_django python manage.py makemigrations subscriptions users bstations bookings bikes travels
docker-compose down -t 1
