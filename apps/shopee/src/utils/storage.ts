const storagePrefix = 'csr_'

export const storage = {
  getToken: () => {
    const token = JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string) as string
    return token
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token))
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`)
  },
  setItem: (name: string, value: string) => {
    window.localStorage.setItem(`${storagePrefix}${name}`, JSON.stringify(value))
  },
  getItem: (name: string) => {
    const item = JSON.parse(window.localStorage.getItem(`${storagePrefix}${name}`) as string) as string
    return item
  },
  removeItem: (name: string) => {
    window.localStorage.removeItem(`${storagePrefix}${name}`)
  }
}
