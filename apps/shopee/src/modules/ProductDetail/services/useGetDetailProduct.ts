import productApi from '@/apis/product.api'
import { Product } from '@/types/product.type'
import { TqueryKeyConfig } from '@/types/queryKey'
import { SuccessResponse } from '@/types/utils.type'
import { getQueryKey } from '@/utils/queryKey'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type TResponse = {
  data: SuccessResponse<Product>
}

export const useGetDetailProduct = (params: string, configs?: UseQueryOptions<TResponse, AxiosError>) => {
  const queries = getQueryKey('product' as TqueryKeyConfig)

  return useQuery<TResponse, AxiosError>({
    queryKey: [...queries, params],
    queryFn: () => productApi.getProductDetail(params || ''),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    ...configs
  })
}
