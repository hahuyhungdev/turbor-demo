import { Purchase, PurchaseListStatus } from '@/types/purchase.type'
import { SuccessResponse } from '@/types/utils.type'
import axiosInstance from '@/utils/axios'
import http from '@/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return axiosInstance.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return axiosInstance.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return axiosInstance.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return axiosInstance.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return axiosInstance.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
