import { Select } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../store/hooks'

export default function PresetPicker({
  onChange,
}: {
  onChange: (value: number) => void
}) {
  const { presets } = useAppSelector((state) => state.settings)

  const { t } = useTranslation()

  const getPresetsData = () => {
    const data: { value: string; label: string }[] = []

    presets.map(({ type, shiftStart, breakTime, shiftEnd }, index) => {
      if (type === 'work' || type === 'exchange') {
        data.push({
          value: index.toString(),
          label: `${t(type)}, ${t(shiftStart)} - ${t(shiftEnd)}, ${t(
            breakTime
          )}`,
        })
      } else {
        data.push({ value: index.toString(), label: `${t(type)}` })
      }
    })

    return data
  }

  return (
    <Select
      label={t('presets')}
      data={getPresetsData()}
      mt={10}
      styles={{
        label: { fontSize: 20 },
        input: { marginTop: 10, fontSize: 20 },
        item: { fontSize: 20 },
      }}
      onChange={(value) => onChange(Number(value))}
    />
  )
}
