const isOjectNotEmpty = (obj: Record<string | number, unknown>) => {
  if (Object.keys(obj).length === 0) return false

  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      return false
    }
  }
  return true
}
export { isOjectNotEmpty }
