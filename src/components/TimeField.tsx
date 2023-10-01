import { useAppSelector } from '../store/hooks'
import { TimeInput } from '@mantine/dates'

export default function TimeField({
  groupName,
  defaultValue,
  label,
  onChange,
}: {
  groupName: string
  defaultValue: string
  label: string
  onChange: (value: string) => void
}) {
  const fontSize: string = useAppSelector((state) => state.settings.fontSize)

  return (
    <TimeInput
      name={groupName}
      defaultValue={defaultValue}
      label={label}
      required
      mt="md"
      styles={{ label: { fontSize }, input: { fontSize } }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  )
}
