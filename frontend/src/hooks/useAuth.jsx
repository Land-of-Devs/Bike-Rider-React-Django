import { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../context/user';
import * as authService from '../services/auth';
import { getCookieJson } from '/src/utils/cookie';

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
  }, [setSession])

  const reloadChanges = () => {
    setSession(getCookieJson('bruser'));
  };

  useEffect(() => {
    var interval = null;
    try {
      if ('cookieStore' in window) {
        window.cookieStore.addEventListener('change', reloadChanges);
      } else {
        var checkCookie = function () {
          var lastCookie = document.cookie;
          return function () {
            var currentCookie = document.cookie;
  
            if (currentCookie != lastCookie) {
              lastCookie = currentCookie;
              reloadChanges();
            }
          };
        }();

        interval = window.setInterval(checkCookie, 250);
      }
    } catch (e) {
      console.error(e);
    }

    return () => {
      clearInterval(interval);
      if ('cookieStore' in window) {
        window.cookieStore.removeEventListener('change', reloadChanges);
      }
    }
  }, [])
  
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