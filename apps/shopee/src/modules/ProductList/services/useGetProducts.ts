import productApi from '@/apis/product.api'
import useQueryConfig from '@/hooks/useQueryConfig'
import { ProductList, ProductListConfig } from '@/types/product.type'
import { TqueryKeyConfig } from '@/types/queryKey'
import { SuccessResponse } from '@/types/utils.type'
import { getQueryKey } from '@/utils/queryKey'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type TResponse = {
  data: SuccessResponse<ProductList>
}

export const useGetProducts = (params?: ProductListConfig, configs?: UseQueryOptions<TResponse, AxiosError>) => {
  const queryConfig = useQueryConfig()
  const queries = getQueryKey('products' as TqueryKeyConfig, queryConfig)
  return useQuery<TResponse, AxiosError>({
    queryKey: [...queries, params],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    ...configs
  })
}
