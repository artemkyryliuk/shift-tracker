import { Radio, Group } from '@mantine/core'

import type { Settings, SettingsValues } from './types/settings'
import { DateConfig, DateConfigValues } from './types/date-config'

export default function RadioGroup({
  groupName,
  defaultValue,
  value,
  label,
  items,
  onChange,
}: {
  groupName: keyof Settings | keyof DateConfig
  defaultValue: string
  value: string
  label: string
  items: { value: SettingsValues | DateConfigValues; label: string }[]
  onChange: (value: string, field: keyof Settings | keyof DateConfig) => void
}) {
  return (
    <Radio.Group
      name={groupName}
      defaultValue={defaultValue}
      value={value}
      label={label}
      withAsterisk
      required
      mt={20}
      styles={{ label: { fontSize: 20 } }}
      onChange={(value) => onChange(value, groupName)}
    >
      <Group sx={{ marginTop: 10 }}>
        {items.map(({ value, label }) => (
          <Radio
            key={value?.toString()}
            value={value?.toString()}
            label={label}
            styles={{ label: { fontSize: 20 } }}
          />
        ))}
      </Group>
    </Radio.Group>
  )
}
