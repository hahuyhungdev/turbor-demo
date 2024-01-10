import { LANGUAGE_REGEX } from '@/configs/appConfig'

export const removeLanguageFromUrl = (url: string) => {
  return url.replace(LANGUAGE_REGEX, '').replaceAll('/', '')
}
