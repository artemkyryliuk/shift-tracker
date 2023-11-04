import { TimeInput } from '@mantine/dates'

export default function TimeField({
  groupName,
  value,
  label,
  onChange,
}: {
  groupName: string
  value: string
  label: string
  onChange: (value: string) => void
}) {
  return (
    <TimeInput
      name={groupName}
      value={value}
      label={label}
      required
      mt="md"
      styles={{ label: { fontSize: 20 }, input: { fontSize: 20 } }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  )
}
