import categoryApi from '@/apis/categoriest'
import useQueryConfig from '@/hooks/useQueryConfig'
import { Category } from '@/types/category.type'
import { TqueryKeyConfig } from '@/types/queryKey'
import { SuccessResponse } from '@/types/utils.type'
import { getQueryKey } from '@/utils/queryKey'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type TResponse = {
  data: SuccessResponse<Category[]>
}

export const useGetCategories = (configs?: UseQueryOptions<TResponse, AxiosError>) => {
  const queryConfig = useQueryConfig()
  const queries = getQueryKey('categories' as TqueryKeyConfig, queryConfig)

  return useQuery<TResponse, AxiosError>({
    queryKey: queries,
    queryFn: () => categoryApi.getCategories(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    ...configs
  })
}
