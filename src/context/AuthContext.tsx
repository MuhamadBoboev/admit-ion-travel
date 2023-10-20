// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { axiosInstance } from 'src/shared/api/axiosInstance'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const initAuth = async (): Promise<void> => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axiosInstance
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser(response.data.data)
          })
          .catch((e: any) => {
            if (e.response.status !== 200) {
              localStorage.removeItem('userData')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('accessToken')
              setUser(null)
              setLoading(false)
              if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                router.replace('/login')
              }
            }
          })
      } else {
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get('/login/profile', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const response = await axiosInstance.post(authConfig.loginEndpoint, params)
      toast.success(response.data.message)
      params.rememberMe
        ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.access_token)
        : null
      const returnUrl = router.query.returnUrl

      setUser(response.data)
      params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data)) : null

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)

    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
      if (errorCallback) errorCallback(err.response)
    }
  }


  const handleLogout = async () => {
    setUser(null)

    // const storedToken = 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)!
    // await axiosInstance.get(authConfig.logoutEndpoint, {
    //   headers: {
    //     Authorization: storedToken
    //   }
    // })
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    initAuth,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
