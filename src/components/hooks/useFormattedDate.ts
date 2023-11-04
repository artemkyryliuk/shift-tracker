import { useTranslation } from 'react-i18next'

export const useFormattedDate = (date: string) => {
  const { i18n } = useTranslation()

  return new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(date))
}
