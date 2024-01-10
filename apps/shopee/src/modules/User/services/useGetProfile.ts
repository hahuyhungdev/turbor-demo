import userApi from '@/apis/user.api'
import { User } from '@/types/user.type'
import { SuccessResponse } from '@/types/utils.type'
import { getQueryKey } from '@/utils/queryKey'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type TResponse = {
  data: SuccessResponse<User>
}

export const useGetProfile = (configs?: UseQueryOptions<TResponse, AxiosError>) => {
  const queries = getQueryKey('profile')
  return useQuery<TResponse, AxiosError>({
    queryKey: [...queries],
    queryFn: () => userApi.getProfile(),
    ...configs
  })
}
