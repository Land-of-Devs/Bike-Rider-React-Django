import { useCallback, useState } from 'react';
import * as travelServices from '../services/travels';

export default function useTravels() {
  const [state, setState] = useState({ loading: false, error: false });
  const [travels, setTravels] = useState([]);

  const changeState = (msg, bool) => {
    setState({ loading: false, error: msg });
    return bool;
  }

  const getTravels = useCallback(async () => {
    setState({ loading: true, error: false })
    await (travelServices).myTravels()
      .then((data) => {
        console.log(data)
        setTravels(data.results);
        return changeState(false, true);
      })
      .catch(err => {
        setTravels([]);
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
    return true;
  }, [setTravels])

  return {
    isLoading: state.loading,
    hasError: state.error,
    travels,
    getTravels,
  }
}