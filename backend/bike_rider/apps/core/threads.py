
from threading import Thread
from django.core.mail import get_connection, EmailMessage
from django.utils import timezone
from bike_rider.apps.travels.models import Travel
from bike_rider.apps.users.models import User
from bike_rider.apps.bookings.models import Booking
from django.db.models import F, ExpressionWrapper, DateTimeField
from django.conf import settings
import time
import os
import datetime

queued_messages = []

def queue_message(msg):
    queued_messages.append(EmailMessage(*msg))

def _send_queued_message():
    if len(queued_messages) == 0:
        return

    msgs = queued_messages[:5]
    try: 
        mailer = get_connection()
        mailer.open()
        mailer.send_messages(msgs)
        mailer.close()
        del queued_messages[:5]
    except:
        pass

def _clear_expired_reservations():
    try:
        Booking.objects.filter(time_end__lt=timezone.now()).delete()
    except:
        print('except expired_reservations')

def _send_travel_time_exceeded_reminder():
    try:
        travels = Travel.objects.filter(
            finish=None, sent_reminder=False
        ).annotate(
            time_limit=ExpressionWrapper(F('start') + F('user__subscription__min_minutes'), output_field=DateTimeField()),
        ).filter(
            time_limit__lt=timezone.now(),
        )
        for t in travels:
            print(t.time_limit, t.start)
            msg = ((
                'You exeeded you FREE time in your subscription (' + t.user.subscription.name + ')',
                'Hello, dear ' + t.user.dni + ' in your travel start at ' + str(t.start) + ' pass the free time, from now will charge you ' + str(t.user.subscription.cent_minute) + 'cent/min',
                settings.EMAIL_HOST_USER,
                [t.user.email]
            ))
            queue_message(msg)
            t.sent_reminder = True
            t.save()
    except Exception as e:
        print(e)

def _send_travel_missing_bike_warning():
    try:
        travels = Travel.objects.filter(
            finish=None, sent_warning=False
        ).annotate(
            time_limit=ExpressionWrapper(F('start') + datetime.timedelta(seconds=3600*6), output_field=DateTimeField()),
        ).filter(
            time_limit__lt=timezone.now(),
        )
        for t in travels:
            print(t.time_limit, t.start)
            msg = ((
                'You DIDN\'T RETURN a bike!',
                'Hello, dear ' + t.user.dni + ' in your travel start at ' + str(t.start) + ', you didn\'t return the bike, you have 24h to return it or we will charge it to you.',
                settings.EMAIL_HOST_USER,
                [t.user.email]
            ))
            queue_message(msg)
            t.sent_warning = True
            t.save()
    except Exception as e:
        print(e)
    pass

thread_list = [
    (_clear_expired_reservations, 3600 ),
    (_send_queued_message, 1),
    (_send_travel_missing_bike_warning, 60),
    (_send_travel_time_exceeded_reminder, 60),
]

def _new_thread(function, delay):
    while True:
        time.sleep(delay)
        function()

def start_threads():
    if os.getpid() == 1:
        print('skipping thread creation on watcher process')
        return
    for x in thread_list:
        try:
            t= Thread( target = _new_thread, args=x)
            t.daemon = True
            t.start()
        except:
            print("Error: unable to start thread")