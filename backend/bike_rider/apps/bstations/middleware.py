import jwt
import json
import datetime
from urllib.parse import quote, quote_plus

from django.conf import settings

from rest_framework import authentication, exceptions

from bike_rider.apps.bookings.models import Booking
from bike_rider.apps.bikes.models import Bike
from .models import BStation
from .serializers import BStationCookieSerializer

class ReadStationSessionMiddleware:
    cookie_name = settings.JWT_AUTH['JWT_STATION_COOKIE']

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.station = None
        scookie = request.COOKIES.get(self.cookie_name, None)

        if scookie:
            request.station = self.read_session(scookie)

        response = self.get_response(request)

        if scookie:
            request.station.bookings = Booking.objects.filter(station_id=request.station.id, time_end__gt=datetime.datetime.today())
            request.station.bikes = Bike.objects.filter(station_id=request.station.id)
            serializer = BStationCookieSerializer(request.station)
            response.set_cookie(
                'brstation',
                quote(json.dumps(serializer.data)),
                expires=datetime.datetime.strptime('9999', '%Y'),
                samesite='Lax'
            )

        return response

    def read_session(self, token):
        try:
            payload = jwt.decode(token, settings.JWT_AUTH['JWT_STATION_SECRET_KEY'], algorithms=settings.JWT_AUTH['ALGORITHM'])
        except:
            msg = 'Invalid authentication. Could not decode token.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            queryset = BStation.objects.filter(pk=payload['station_id'])
            queryset = BStation.annotate_slot_info(queryset)
            return queryset.get()
        except BStation.DoesNotExist:
            msg = 'No station matching this token was found.'
            raise exceptions.AuthenticationFailed(msg)
