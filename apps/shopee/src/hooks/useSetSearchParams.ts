import { useCallback } from 'react'
import { NavigateOptions, createSearchParams, useNavigate } from 'react-router-dom'

// Here the type of params is defined as a record with key-value pairs
function useSetSearchParams() {
  const navigate = useNavigate()

  const setParams = useCallback(
    (newParams: Record<string, string | string[]>, options?: NavigateOptions) => {
      const searchParams = createSearchParams(newParams)
      navigate({
        search: searchParams.toString(),
        ...options
      })
    },
    [navigate]
  )

  return setParams
}

export default useSetSearchParams
