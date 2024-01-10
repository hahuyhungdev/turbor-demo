import axiosInstance from '@/utils/axios'
import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return axiosInstance.get<SuccessResponse<Category[]>>(URL)
  },
  getCategoryDetail(id: string) {
    return axiosInstance.get<SuccessResponse<Category>>(`${URL}/${id}`)
  }
}

export default categoryApi
