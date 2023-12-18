type TKeyParams = {
  [key: string]: unknown
}

export function getQueryKey<T extends TKeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])]
}
