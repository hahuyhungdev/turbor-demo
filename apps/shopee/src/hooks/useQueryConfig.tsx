import { ProductListConfig } from '@/types/product.type'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  // Explain: hear, we use lodash to omit undefined value in queryParam.
  //Because we don't want to send undefined value to server
  const queryConfig: QueryConfig = omitBy(
    {
      ...queryParams,
      page: queryParams.page || '1'
    },
    isUndefined
  )
  return queryConfig
}
