import base64 from 'base-64'

import { getLanguage } from '@/configs/appConfig'

const HOME = ''
export const generateDummyArray = (length = 3) => {
  return new Array(length).fill(0).map((_, index) => index)
}

export const generateYears = (fromYear: number, sortASC = true) => {
  const now = new Date(Date.now()).getFullYear()
  return new Array(now - fromYear + 1)
    .fill(0)
    .map((_, index) => now - index)
    .sort((a, b) => (sortASC ? a - b : b - a))
}

export const redirectExternalLink = (url: string) => {
  window.open(url)
}

export const getUrlWithLanguage = (path: string) => {
  if (path === HOME) return `/${getLanguage()}/`
  return `/${getLanguage()}/${path}`
}

export const generateCaptcha = (size = 4) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let captcha = ''
  for (let i = 0; i < size; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)]
  }
  return captcha
}

export const base64ToUnit8Array = (base64String: string) => {
  const byteCharacters = base64.decode(base64String)
  const byteArrays: Uint8Array[] = []

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return byteArrays
}

export const downloadFile = (fileData: string, fileName: string) => {
  if (fileData.startsWith('http') || fileData.startsWith('https')) {
    window.open(fileData)
    return
  }

  const byteArrays = base64ToUnit8Array(fileData)

  const blob = new Blob(byteArrays, { type: 'application/octet-stream' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', fileName)
  link.click()
}

export const numberToMonth = (number: number, size?: number) => {
  const month = new Date(0, number - 1).toLocaleString(getLanguage(), { month: 'long' })
  return size ? month.slice(0, size) : month
}

export function preventScroll(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  e.stopPropagation()

  return false
}

export const splitText = (text: string, maxLength: number, ignoreSpace?: boolean) => {
  if (text.length <= maxLength) return text
  const numberSpace = text.split(' ').length - 1

  if (ignoreSpace) {
    return text.slice(0, maxLength + numberSpace) + '...'
  }
  return text.slice(0, maxLength) + '...'
}

export const removeEmptySpace = (text: string) => {
  return text.replace(/\r\n/g, '\n')
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
