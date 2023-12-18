import axiosInstance from '@/utils/axios'
import { User } from '@/types/user.type'
import { SuccessResponse } from '@/types/utils.type'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return axiosInstance.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return axiosInstance.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return axiosInstance.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
