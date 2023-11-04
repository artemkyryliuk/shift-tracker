import { Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export default function AppInfo() {
  const { t } = useTranslation()

  const appVersion = '04.11.2023'

  return (
    <Text p={15} ta="center" fz={20} c="lime">
      {`${t('appVersion')} ${appVersion}). ${t('developer')}`}
    </Text>
  )
}
