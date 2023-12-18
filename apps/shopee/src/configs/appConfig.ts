import i18next from 'i18next'

export const {
  VITE_API_URL: API_URL,
  VITE_COMMUNITY_KOREAN: COMMUNITY_KOREAN,
  VITE_COMMUNITY_ENGLISH: COMMUNITY_ENGLISH,
  VITE_ANNOUNCEMENT_BOARD: ANNOUNCEMENT_BOARD,
  MODE
} = import.meta.env

export const getLanguage = (): string => i18next.language || window.localStorage.i18nextLng

export const SERVICE_ID = '1690'

export const HEADER_HEIGHT = 80
export const HEADER_MOBILE_HEIGHT = 61

export const BOARD = {
  PEOPLE: '2309',
  NEWS: '2310',
  HISTORY: '2316',
  ANNUAL_REPORT: '2315',
  POLICY: '2317',
  POLICY_IMAGE: '2318',
  NOTICE: '2311'
}

export const LANGUAGES = {
  kr: 'kr',
  en: 'en'
}

export const LANGUAGE_REGEX = new RegExp(Object.values(LANGUAGES).join('|'))

export const COMMUNITY_ID: Record<string, string> = {
  kr: COMMUNITY_KOREAN,
  en: COMMUNITY_ENGLISH
}

export const NEXON_BLOG_LINK = import.meta.env.VITE_NEXON_BLOG_LINK
