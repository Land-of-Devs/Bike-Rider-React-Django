import { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../context/user';
import * as authService from '../services/auth';
import { getCookieJson, watchCookies } from '/src/utils/cookie';
import { shallowEqual } from '/src/utils/misc';

export default function useAuth() {
  const { session, setSession } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })


  const login = useCallback(({ dni, password }) => {
    setState({ loading: true, error: false })
    return authService.login({ dni, password })
      .then( () => {
        setState({ loading: false, error: false })
      })
      .catch(err => {
        setState({ loading: false, error: true })
        console.error(err)
      })
  }, [setSession])

  const logout = useCallback(() => {
      authService.logout()
  }, [setSession]);

  useEffect(() => {
    return watchCookies(() => {
      console.log('reload cookies');

      var newSession = getCookieJson('bruser');
      if (!shallowEqual(session, newSession)) {
        console.log('new bruser')
        console.log(JSON.stringify(session))
        console.log(JSON.stringify(newSession))
        setSession(newSession);
      }
    });
  }, [session]);

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
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    //register,
  }
}
