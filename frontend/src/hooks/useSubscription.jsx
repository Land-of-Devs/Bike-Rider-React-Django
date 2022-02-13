import { useCallback, useContext, useState } from 'react';
import UserContext from '../context/user';
import useAuth from './useAuth';
import * as subscriptionsService from '../services/subscriptions';

export default function useSubscription() {
  const { subscription } = useContext(UserContext);
  const { refresh } = useAuth()
  const [state, setState] = useState({ loading: false, error: false });
  const [subscriptions, setSubscriptions] = useState([]);

  const changeState = (msg, bool) => {
    setState({ loading: false, error: msg });
    return bool;
  }

  const subscriptionList = useCallback(async () => {
    setState({ loading: true, error: false })
    await (subscriptionsService).list()
      .then((data) => {
        setSubscriptions(data.results);
        return changeState(false, true);
      })
      .catch(err => {
        setSubscriptions([]);
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
    return true;
  }, [])

  const changeSubscription = useCallback(({ sub }) => {
    setState({ loading: true, error: false })
    return subscriptionsService.change({ sub })
      .then(() => {
        refresh();
        return changeState(false, true);
      })
      .catch(err => {
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        return changeState(msg, false);
      })
  }, [])

  return {
    isLoading: state.loading,
    hasError: state.error,
    changeSubscription,
    subscription,
    subscriptions,
    subscriptionList,
  }
}
