import { getLanguage } from '@/configs/appConfig'

const KR_CHARACTERS_LIMIT = 32
const EN_CHARACTERS_LIMIT = 40

export const getTextTruncate = (content: string) => {
  if (getLanguage() === 'kr' && content.length > KR_CHARACTERS_LIMIT) {
    return content.slice(0, KR_CHARACTERS_LIMIT).concat('...')
  }

  if (content.length > EN_CHARACTERS_LIMIT) {
    return content.slice(0, EN_CHARACTERS_LIMIT).concat('...')
  }

  return content
}
