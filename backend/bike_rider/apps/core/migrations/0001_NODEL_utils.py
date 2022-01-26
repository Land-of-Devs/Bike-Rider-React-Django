import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.RunSQL(
            (''' CREATE OR REPLACE FUNCTION distance(
                    lat1 double precision,
                    lon1 double precision,
                    lat2 double precision,
                    lon2 double precision)
                RETURNS double precision AS
                $BODY$
                DECLARE
                    R integer = 6371; -- Kilometers
                    rad double precision = 0.01745329252;

                    r1 double precision = lat1 * rad;
                    r2 double precision = lat2 * rad;
                    dR double precision = (lat2-lat1) * rad;
                    dL double precision = (lon2-lon1) * rad;

                    a double precision = sin(dR/2) * sin(dR/2) + cos(r1) * cos(r2) * sin(dL/2) * sin(dL/2);
                    c double precision = 2 * atan2(sqrt(a), sqrt(1-a));    
                BEGIN                                                     
                    RETURN R * c;        
                END  
                $BODY$
                LANGUAGE plpgsql IMMUTABLE
                COST 110; '''),
            ('DROP FUNCTION IF EXISTS distance;')
        ),
        migrations.RunSQL(
            (''' CREATE OR REPLACE FUNCTION approxDistance(
                    lat1 double precision,
                    lon1 double precision,
                    lat2 double precision,
                    lon2 double precision)
                RETURNS double precision AS
                $BODY$
                DECLARE
                    R integer = 6371; -- Kilometers
                    rad double precision = 0.01745329252;
                BEGIN                                                     
                    RETURN R * rad * (abs(lat1 - lat2) + abs(lon1 - lon2));
                END  
                $BODY$
                LANGUAGE plpgsql IMMUTABLE
                COST 100; '''),
            ('DROP FUNCTION IF EXISTS approxDistance;')
        ),
    ]
