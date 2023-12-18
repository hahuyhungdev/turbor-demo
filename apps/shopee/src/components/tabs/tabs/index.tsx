import React, { ReactNode, useContext, useMemo, useState } from 'react'

interface ITabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?: 'contained' | 'outlined'
  defaultValue: number
  children: ReactNode
}

interface ITabsContextValue {
  activeValue: number
  setActiveValue: React.Dispatch<React.SetStateAction<number>>
  variant: ITabsProps['variant']
}

const TabsContext = React.createContext<ITabsContextValue | null>(null)

export const Tabs = ({ defaultValue, children, variant = 'contained', ...props }: ITabsProps) => {
  const [activeValue, setActiveValue] = useState(defaultValue)

  const contextValue = useMemo<ITabsContextValue>(
    () => ({ activeValue, setActiveValue, variant }),
    [activeValue, variant]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('Tabs compound components have to render inside the Tabs component')
  }

  return context
}
