import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import BStation


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
        return response

    def read_session(self, token):
        try:
            payload = jwt.decode(
                token, settings.JWT_AUTH['JWT_STATION_SECRET_KEY'])
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
