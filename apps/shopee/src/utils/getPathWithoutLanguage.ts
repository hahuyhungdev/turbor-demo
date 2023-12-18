import { getLanguage } from '@/configs/appConfig'

export const getPathWithoutLanguage = (pathname: string, hash: string) => {
  return pathname.replace(`/${getLanguage()}/`, '').concat(hash)
}
