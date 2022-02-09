# Bike Rider install and configuration steps

Example environment file on `config/private/dev/super-secrets.env`:
```
BR_MAIL_HOST=smtp.gmail.com
BR_MAIL_PORT=587
BR_MAIL_NAME=Bike Rider
BR_MAIL_USER=bikerider@gmail.com
BR_MAIL_PASS=account_or_app_password
VITE_GMAPS_PUBLIC_KEY=gmaps_public_api_key
```

If you prefer to not configure mail sending and Google Maps, the file can be left empty.

To configure the project for production, use the folder `config/private/prod`. The files and variables are the same, so you can copy the development config over to prod.

To start the project in development mode, use: `docker-compose up`

To build and deploy the project in production mode, use: `docker-compose -f docker-compose.prod.yml up`

Note that since some container names are the same in dev and prod, you might need to run `docker-compose down` to remove old containers.
