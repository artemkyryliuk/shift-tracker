import { Radio, Group } from '@mantine/core'

import { useAppSelector } from '../store/hooks'
import type { Settings, SettingsValues } from './types/settings'
import { DateConfig, DateConfigValues } from './types/date-config'

export default function RadioGroup({
  groupName,
  defaultValue,
  label,
  items,
  onChange,
}: {
  groupName: keyof Settings | keyof DateConfig
  defaultValue: string
  label: string
  items: { value: SettingsValues | DateConfigValues; label: string }[]
  onChange: (value: string, field: keyof Settings | keyof DateConfig) => void
}) {
  const fontSize = useAppSelector((state) => state.settings.fontSize)

  return (
    <Radio.Group
      name={groupName}
      defaultValue={defaultValue}
      label={label}
      withAsterisk
      required
      mt={fontSize}
      styles={{ label: { fontSize } }}
      onChange={(value) => onChange(value, groupName)}
    >
      <Group sx={{ marginTop: fontSize }}>
        {items.map(({ value, label }) => (
          <Radio
            key={value}
            value={value}
            label={label}
            styles={{ label: { fontSize } }}
          />
        ))}
      </Group>
    </Radio.Group>
  )
}
