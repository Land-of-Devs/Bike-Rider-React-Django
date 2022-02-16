import { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import * as bookingService from '../services/bookings';

export default function useBooking() {
  const { reservation, setReservation } = useContext(UserContext)
  const [state, setState] = useState({ loading: false, error: false })

  const changeState = (msg, bool) => {
    setState({ loading: false, error: msg });
    return bool;
  }

  useEffect(() => {
    if (reservation?.id) {
      const end = new Date(reservation.time_end);
      end.setHours(end.getHours() + 1);
      if (Date.now() >= end.getTime()) {
        setReservation({});
      }
    }
  }, []);

  const getReservation = useCallback(() => {
    setState({ loading: true, error: false })

    const booking = () => {
      bookingService.myReservation()
      .then((booking) => {
        setReservation(booking)
        return changeState(false, true)
      })
      .catch(err => {
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
    };

    if (Object.keys(reservation).length > 0) {
      const endDate = new Date(reservation.time_end).getTime();
      const now = new Date();
      now.setHours(now.getHours() - 1);
      const time = endDate - now.getTime();
      if (time <= 0) {
        booking()
      }
    } else {
      booking()
    }
    return true;
  }, [reservation]);

  const createReservation = useCallback((stationId) => {
    setState({ loading: true, error: false })
    bookingService.create({ station: stationId })
      .then(() => {
        setReservation({})
        getReservation();
        return changeState(false, false)
      })
      .catch(err => {
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
  }, [setReservation, getReservation]);

  const cancelReservation = useCallback(() => {
    setState({ loading: true, error: false })
    bookingService.cancel()
      .then(() => {
        setReservation({})
        return changeState(false, false)
      })
      .catch(err => {
        setReservation({});
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
  }, [setReservation])

  return {
    isLoading: state.loading,
    hasError: state.error,
    reservation,
    setReservation,
    getReservation,
    createReservation,
    cancelReservation,
  }
}
