import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '@/apis/auth.api'
import { AuthResponse, RefreshTokenRespone } from '@/types/auth.type'
import { ErrorResponse } from '@/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig
} from 'axios'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<any> | null = null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 25
      }
    })

    this.instance.interceptors.request.use(this.authRequestInterceptor)
    this.instance.interceptors.response.use(this.parseResultsHandler, this.errorHandlerChain)
  }

  private authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    if (this.accessToken && config.headers) {
      config.headers.authorization = this.accessToken
    }
    return config
  }

  private parseResultsHandler = (response: AxiosResponse): AxiosResponse => {
    const { url } = response.config

    if (url?.includes(URL_LOGIN) || url?.includes(URL_REGISTER)) {
      const dataResponse = response.data as AuthResponse
      this.accessToken = dataResponse.data.access_token
      this.refreshToken = dataResponse.data.refresh_token
      setAccessTokenToLS(this.accessToken)
      setRefreshTokenToLS(this.refreshToken)
      setProfileToLS(dataResponse.data.user)
    } else if (url?.includes(URL_LOGOUT)) {
      this.accessToken = ''
      this.refreshToken = ''
      clearLS()
    }

    return response
  }

  private errorHandlerChain = (error: AxiosError): Promise<never> => {
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message
      toast.error(message)
    }

    if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
      const config = error.response?.config as AxiosRequestConfig | undefined
      const url = config?.url || ''

      if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
        this.refreshTokenRequest = this.refreshTokenRequest
          ? this.refreshTokenRequest
          : this.handleRefreshToken().finally(() => {
              setTimeout(() => {
                this.refreshTokenRequest = null
              }, 10000)
            })

        return this.refreshTokenRequest.then((access_token) => {
          return this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } })
        })
      }

      clearLS()
      this.accessToken = ''
      this.refreshToken = ''
      toast.error(error.response?.data.data?.message || error.response?.data.message)
    }

    return Promise.reject(error)
  }

  private handleRefreshToken = async (): Promise<string> => {
    try {
      const response = await this.instance.post<RefreshTokenRespone>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      const access_token = response.data.data.access_token
      setAccessTokenToLS(access_token)
      this.accessToken = access_token
      return access_token
    } catch (error) {
      clearLS()
      this.accessToken = ''
      this.refreshToken = ''
      throw error
    }
  }
}

const axiosInstance = new Http().instance
export default axiosInstance
