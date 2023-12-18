import { ReactNode } from 'react'

import { useTabsContext } from '../tabs'

interface ITabPanelProps {
  value: number
  children: ReactNode
}

export const TabPanel = ({ value, children }: ITabPanelProps) => {
  const { activeValue } = useTabsContext()

  if (activeValue !== value) return null
  return <div>{children}</div>
}
