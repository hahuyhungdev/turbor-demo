import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

import { useTabsContext } from '@/components/tabs/tabs'

import classNames from './styles.module.scss'

interface ITabListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
}

export const TabList = React.forwardRef<HTMLUListElement, ITabListProps>(({ children, className, ...props }, ref) => {
  const { variant } = useTabsContext()

  return (
    <ul
      className={clsx(classNames['tab-list'], className, {
        [classNames.outlined]: variant === 'outlined'
      })}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  )
})

TabList.displayName = 'TabList'
