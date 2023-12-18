import { Product, ProductList, ProductListConfig } from '@/types/product.type'
import { SuccessResponse } from '@/types/utils.type'
import axiosInstance from '@/utils/axios'
const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return axiosInstance.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return axiosInstance.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
export default productApi
