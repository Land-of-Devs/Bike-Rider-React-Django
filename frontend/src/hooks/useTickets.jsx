import { useCallback, useState } from 'react';
import * as ticketsService from '../services/tickets';

export default function useTickets() {
  const [state, setState] = useState({ loading: false, error: false })

  const changeState = (msg, bool) => {
    setState({ loading: false, error: msg });
    return bool;
  }

  const sendTicket = useCallback(({ ticket }) => {
    setState({ loading: true, error: false })
    return ticketsService.create({ ticket })
      .then(() => {
        return changeState(false, true)
      })
      .catch(err => {
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
  }, [])


  return {
    isLoading: state.loading,
    hasError: state.error,
    sendTicket
  }
}
