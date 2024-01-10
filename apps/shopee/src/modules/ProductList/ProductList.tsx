import Pagination from '@/components/Pagination'
import useQueryConfig from '@/hooks/useQueryConfig'
import { Product as ProductType } from '@/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'

import { Head } from '@/components/Head'
import { useGetCategories } from './services/useGetCategories'
import { useGetProducts } from './services/useGetProducts'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useGetProducts()
  const { data: categoriesData } = useGetCategories()

  return (
    <div className='bg-gray-200 py-6'>
      <Head title={'Product List'} />
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          </div>

          {productsData && (
            <div className='sticky z-10 col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
