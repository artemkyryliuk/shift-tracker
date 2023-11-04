import { useTranslation } from 'react-i18next'
import { Container, Divider, Text, TextInput, Title } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import RadioGroup from '../components/RadioGroup'

import { updateSettings } from '../store/settingsSlice'
import '../utils/i18n'
import type { Settings } from '../components/types/settings'
import PresetsEditor from '../components/PresetsEditor'
import AppInfo from '../components/AppInfo'

export default function SettingsPage() {
  const settings = useAppSelector((state) => state.settings)
  const { colorScheme, salary } = settings
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  const handleFieldChange = (
    value: string | number,
    field: keyof Settings | 'language'
  ) => {
    dispatch(updateSettings({ ...settings, [field]: value }))
  }

  return (
    <Container mt={120} p={30} pt={0}>
      <Text mt={20} ta="center" fz={20}>
        {t('settings')}
      </Text>

      <RadioGroup
        groupName="colorScheme"
        defaultValue={colorScheme}
        value={colorScheme}
        label={t('theme')}
        items={[
          { value: 'light', label: t('light') },
          { value: 'dark', label: t('dark') },
        ]}
        onChange={(value) => handleFieldChange(value, 'colorScheme')}
      />

      <RadioGroup
        groupName="language"
        defaultValue={i18n.language}
        value={i18n.language}
        label={t('language')}
        items={[
          { value: 'uk', label: 'Українська' },
          { value: 'en', label: 'English' },
        ]}
        onChange={(value) => i18n.changeLanguage(value)}
      />

      <Title mt={20} fz={20} fw={500}>
        {`${t('salary')} ${t('perHour')}`}
      </Title>

      <TextInput
        type="number"
        defaultValue={salary}
        min={0}
        mt={10}
        styles={{ input: { fontSize: 20 } }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFieldChange(e.target.value, 'salary')
        }
      />

      <Title mt={10} fz={20} fw={500}>
        {t('presets')}
      </Title>

      <PresetsEditor />

      <Divider mt={20} />

      <AppInfo />
    </Container>
  )
}
