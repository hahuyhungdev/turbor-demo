import React, { Suspense, memo } from 'react'
import Footer from '@/components/Footer'
import RegisterHeader from '@/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}
function RegisterLayout({ children }: Props) {
  return (
    <Suspense>
      <RegisterHeader />
      {children}
      <Footer />
    </Suspense>
  )
}

export default memo(RegisterLayout)
