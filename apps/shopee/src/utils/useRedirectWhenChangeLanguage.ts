import queryString from 'query-string'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { LANGUAGES } from '@/configs/appConfig'
import { getUrlWithLanguage } from './helper'

export const BACK_LANGUAGE_KEY = 'backLanguage'

const useRedirectWhenChangeLanguage = (to: string) => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  const handleLanguageChange = useCallback(
    (to: string) => {
      if (isFirstRender) return

      navigate({
        pathname: getUrlWithLanguage(to),
        search: queryString.stringify({
          [BACK_LANGUAGE_KEY]: i18n.language === LANGUAGES.en ? LANGUAGES.kr : LANGUAGES.en
        })
      })
    },
    [navigate, i18n, isFirstRender]
  )

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    const onLanguageChange = () => {
      handleLanguageChange(to)
    }

    i18n.on('languageChanged', onLanguageChange)

    return () => {
      i18n.off('languageChanged', onLanguageChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLanguageChange])
}

export default useRedirectWhenChangeLanguage
