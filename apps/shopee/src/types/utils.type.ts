import type { QueryFunction, QueryKey as TQueryKey } from '@tanstack/query-core'
import { UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// syntax '-?' will remove property undefined of key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export type UseGetDataQueries<TResponse> = {
  params?: TQueryKey
  configs?: UseQueryOptions<TResponse, AxiosError>
}
