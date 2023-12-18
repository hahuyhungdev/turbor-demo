export const getObjectValue = (key: string, object = {}): number => {
  const item = Object.entries(object).find((item) => item[0] === key) as [string, number]

  return item ? item[1] : 0
}
