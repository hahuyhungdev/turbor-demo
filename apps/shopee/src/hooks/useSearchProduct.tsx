import { TSchemaSearch, schemaSearch } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import useSetSearchParams from './useSetSearchParams'

type formData = TSchemaSearch
function useSearchProduct() {
  const nameSchema = schemaSearch
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const setSearchParams = useSetSearchParams()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: queryConfig.name || ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data: formData) => {
    console.log('data', data)
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    setSearchParams(config)
  })
  return { register, onSubmitSearch }
}

export default useSearchProduct
