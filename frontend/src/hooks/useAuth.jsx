import { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import * as authService from '../services/auth';
import { getCookieJson, watchCookies } from '/src/utils/cookie';
import { shallowEqual } from '/src/utils/misc';

export default function useAuth() {
  const { session, setSession } = useContext(UserContext)
  const [state, setState] = useState({ loading: false, error: false })

  const changeState = (msg, bool) => {
    setState({loading: false, error: msg});
    return bool;
  }

  const login = useCallback(({ dni, password }) => {
    setState({ loading: true, error: false })
    return authService.login({ dni, password })
      .then( () => {
        return changeState(false, true)
      })
      .catch(err => {
        const msg = err.response.data.errors || {Fail: [err.response.data.detail]};
        return changeState(msg, false);
      })
  }, [setSession])

  const register = useCallback(({ dni, email, password }) => {
    setState({ loading: true, error: false })
    return authService.register({ dni, email, password })
      .then(() => {
        setState({ loading: false, error: false })
        return true;
      })
      .catch(err => {
        const msg = err.response.data.errors || { Fail: [err.response.data.detail] };
        setState({ loading: false, error: msg })
        return false;
      })
  }, [setSession])

  const logout = useCallback(() => {
      authService.logout()
  }, [setSession]);

  useEffect(() => {
    return watchCookies(() => {
      var newSession = getCookieJson('bruser');
      if (!shallowEqual(session, newSession)) {
        setSession(newSession);
      }
    });
  }, [setSession, session]);

  const adminAcces = useCallback((session) => {
    if(session){
      return session.role === 'ADMIN' || session.role === 'SUPERADMIN';
    }
    return false;
  }, [session]);

  const supportAccess = useCallback((session) => {
    if (session) {
      return session.role === 'SUPPORT';
    }
    return false;
  }, [session]);

  const maintenanceAccess = useCallback((session) => {
    if (session) {
      return session.role === 'MAINTENANCE';
    }
    return false;
  }, [session]);

  return {
    isLogged: Boolean(session),
    isAdmin: adminAcces(session),
    isSupport: supportAccess(session),
    isMaintenance: maintenanceAccess(session),
    isLoading: state.loading,
    hasError: state.error,
    login,
    logout,
    register,
  }
}
