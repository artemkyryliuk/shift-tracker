import { useTranslation } from 'react-i18next'
import { Container, TextInput, Title } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import RadioGroup from '../components/RadioGroup'

import { updateSettings } from '../store/settingsSlice'
import '../utils/i18n'
import type { Settings } from '../components/types/settings'

export default function SettingsPage() {
  const settings = useAppSelector((state) => state.settings)
  const { colorScheme, fontSize, salary } = settings
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  const handleFieldChange = (
    value: string | number,
    field: keyof Settings | 'language'
  ): void => {
    dispatch(updateSettings({ ...settings, [field]: value }))
  }

  return (
    <Container p={30} pt={0}>
      <RadioGroup
        groupName="colorScheme"
        defaultValue={colorScheme}
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
        label={t('language')}
        items={[
          { value: 'uk', label: 'Українська' },
          { value: 'en', label: 'English' },
        ]}
        onChange={(value) => i18n.changeLanguage(value)}
      />

      <RadioGroup
        groupName="fontSize"
        defaultValue={fontSize}
        label={t('fontSize')}
        items={[
          { value: '16px', label: '16' },
          { value: '20px', label: '20' },
          { value: '24px', label: '24' },
        ]}
        onChange={(value) => handleFieldChange(value, 'fontSize')}
      />

      <Title mt={fontSize} fz={fontSize} fw={500}>
        {`${t('salary')} ${t('perHour')}`}
      </Title>

      <TextInput
        type="number"
        defaultValue={salary}
        min={0}
        mt={fontSize}
        styles={{ input: { fontSize } }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFieldChange(e.target.value, 'salary')
        }
      />
    </Container>
  )
}
