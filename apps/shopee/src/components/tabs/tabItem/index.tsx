/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import clsx from 'clsx'
import { CSSProperties, DetailedHTMLProps, LiHTMLAttributes, ReactNode } from 'react'

import { useTabsContext } from '../tabs'

import classNames from './styles.module.scss'

interface ITabItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  value: number
  children: ReactNode
  activeStyle?: CSSProperties
  className?: string
}

export const TabItem = ({ value, children, activeStyle, className, style, ...props }: ITabItemProps) => {
  const { activeValue, setActiveValue, variant } = useTabsContext()

  const handleClick = () => {
    setActiveValue(value)
  }

  return (
    <li
      className={clsx(
        classNames['tab-item'],
        className,
        {
          [classNames.active]: activeValue === value
        },
        { [classNames.outline]: variant === 'outlined' }
      )}
      onClick={handleClick}
      style={activeValue === value ? { ...style, ...activeStyle } : style}
      {...props}
    >
      <span>{children}</span>
    </li>
  )
}
