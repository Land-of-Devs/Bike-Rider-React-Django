"""
Django settings for bike_rider project.

Generated by 'django-admin startproject' using Django 2.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import datetime

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = '/app_data/'
MEDIA_URL = '/api/data/'

EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('BR_MAIL_HOST', None)
EMAIL_PORT = os.environ.get('BR_MAIL_PORT', None)
EMAIL_SENDER_NAME = os.environ.get('BR_MAIL_NAME', None)
EMAIL_HOST_USER = os.environ.get('BR_MAIL_USER', None)
EMAIL_HOST_PASSWORD = os.environ.get('BR_MAIL_PASS', None)
EMAIL_TIMEOUT = 10

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'test')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('ENV', None) != 'prod'

ALLOWED_HOSTS = ['localhost']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'bike_rider',
    'bike_rider.apps.core',
    'bike_rider.apps.bikes',
    'bike_rider.apps.bstations',
    'bike_rider.apps.bookings',
    'bike_rider.apps.subscriptions',
    'bike_rider.apps.users',
    'bike_rider.apps.travels',
    'bike_rider.apps.tickets',
    'bike_rider.apps.coupons'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'bike_rider.apps.bstations.middleware.ReadStationSessionMiddleware',
]

ROOT_URLCONF = 'bike_rider.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bike_rider.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_DATABASE', None),
        'USER': os.environ.get('DB_USERNAME', None),
        'PASSWORD': os.environ.get('DB_PASSWORD', None),
        'HOST': os.environ.get('DB_HOST', None),
        'PORT': os.environ.get('DB_PORT', None)
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

renderers = [
        'rest_framework.renderers.JSONRenderer',
]

if os.environ.get('ENV', None) != 'prod':
    renderers.append('rest_framework.renderers.BrowsableAPIRenderer')
    static = os.path.join(BASE_DIR, '/api/static/')
else:
    static = '/app_data/static/'


STATIC_ROOT = static
STATIC_URL = '/api/static/'

# Tell Django about the custom `User` model we created. The string
# `authentication.User` tells Django we are referring to the `User` model in
# the `authentication` module. This module is registered above in a setting
# called `INSTALLED_APPS`.
AUTH_USER_MODEL = 'users.User'

JWT_AUTH = {
    'SIGNING_KEY': os.environ.get('JWT_USER_PASSPHRASE', None),
    'JWT_STATION_SECRET_KEY': os.environ.get('JWT_STATION_PASSPHRASE', None),
    'JWT_STATION_CONFIG_SECRET_KEY': os.environ.get('JWT_STATION_CONFIG_PASSPHRASE', None),
    'ALGORITHM': 'HS256',
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=14),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=14),
    'UPDATE_LAST_LOGIN': True,

    'AUTH_HEADER_TYPES': ('Token', 'Bearer',),
    'JWT_AUTH_COOKIE': 'brsession',
    'JWT_REFRESH_COOKIE': 'brrefresh',
    'JWT_STATION_COOKIE': 'br_station_session',
}

SIMPLE_JWT = JWT_AUTH

REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'bike_rider.apps.core.exceptions.core_exception_handler',
    'NON_FIELD_ERRORS_KEY': 'error',

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'bike_rider.apps.users.backends.CookieJWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser'
    ],
    'DEFAULT_RENDERER_CLASSES': renderers
}
