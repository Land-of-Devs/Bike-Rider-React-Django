import { useCallback, useContext, useState } from 'react'
import Context from '../context/user'
import * as authService from '../services/auth'

export default function useAuth() {
  const { session, setSession } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })


  const login = useCallback(({ dni, password }) => {
    setState({ loading: true, error: false })
    authService.login({ dni, password })
      .then(session => {
        console.log(session)
        setState({ loading: false, error: false })
        setSession(session)
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwt')
        setState({ loading: false, error: true })
        console.error(err)
      })
  }, [setSession])

  // const logout = useCallback(() => {
  //   window.sessionStorage.removeItem('jwt')
  //   setJWT(null)
  // }, [setSession])


  return {
    isLogged: Boolean(session),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    //logout,
    //register,
  }
} 