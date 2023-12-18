import React from 'react'

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
/**
 * Usage:
 *
 *  const { Home } = lazyImport(() => import("./Home"), "Home");
 */
export function lazyImport<T extends React.ComponentType<unknown>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] })))
  })
}
