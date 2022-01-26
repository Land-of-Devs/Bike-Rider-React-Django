from django.db.models import Func
import math

def to_float_or_none(strn):
    try:
        v = float(strn)
        return v if math.isfinite(v) else None
    except:
        return None



class ApproxDistance(Func):
    function = 'approxDistance'
    arity = 4


class Distance(Func):
    function = 'distance'
    arity = 4
