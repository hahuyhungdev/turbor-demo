import axiosInstance from '@/utils/axios'
import { AuthResponse } from '@/types/auth.type'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return axiosInstance.post<AuthResponse>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return axiosInstance.post<AuthResponse>(URL_LOGIN, body)
  },
  logoutAccount() {
    return axiosInstance.post('/logout')
  }
}
export default authApi
