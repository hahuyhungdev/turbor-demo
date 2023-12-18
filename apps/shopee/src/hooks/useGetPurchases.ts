import purchaseApi from '@/apis/purchase.api'
import { purchasesStatus } from '@/configs/purchase'
import { Purchase, PurchaseListStatus } from '@/types/purchase.type'
import { TqueryKeyConfig } from '@/types/queryKey'
import { SuccessResponse } from '@/types/utils.type'
import { getQueryKey } from '@/utils/queryKey'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type TResponse = {
  data: SuccessResponse<Purchase[]>
}

export const useGetPurchases = (
  params?: { status: PurchaseListStatus },
  configs?: UseQueryOptions<TResponse, AxiosError>
) => {
  const queries = getQueryKey('purchases' as TqueryKeyConfig, params)

  return useQuery<TResponse, AxiosError>({
    queryKey: queries,
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    ...configs
  })
}
