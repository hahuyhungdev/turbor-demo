import React, { Suspense, memo } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface Props {
  children?: React.ReactNode
}
function MainLayout({ children }: Props) {
  return (
    <Suspense>
      <Header />
      {children}
      <Footer />
    </Suspense>
  )
}
export default memo(MainLayout)
