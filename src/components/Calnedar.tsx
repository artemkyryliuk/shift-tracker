import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDisclosure } from '@mantine/hooks'
import { Badge, Indicator, Text } from '@mantine/core'
import { DatePicker, DatePickerProps } from '@mantine/dates'
import 'dayjs/locale/uk'

import { useAppSelector } from '../store/hooks'
import DateEdit from './DateEdit'
import Stats from './Stats'
import { findConfig } from '../utils/findConfig'
import type { DateConfig } from './types/date-config'

export default function Calendar() {
  const dates: DateConfig[] = useAppSelector((state) => state.dates)
  const { fontSize } = useAppSelector((state) => state.settings)

  const { i18n } = useTranslation()

  const initialDateConfig: DateConfig = {
    date: new Date().toLocaleDateString(),
    type: '',
    shiftStart: '',
    shiftEnd: '',
    break: '',
  }

  const [dateConfig, setDateConfig] = useState<DateConfig>(initialDateConfig)
  const [opened, { open, close }] = useDisclosure(false)

  const [selectedDate, setSelectedDate] = useState<{
    month: number
    year: number
  }>({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })

  const handleDate = (date: Date) => {
    const dateString = date.toLocaleDateString()
    const foundConfig = findConfig(dates, dateString)

    if (foundConfig) {
      setDateConfig(foundConfig)
    } else {
      setDateConfig({ ...dateConfig, date: dateString })
    }

    open()
  }

  const resetDateConfig = (date: string) => {
    setDateConfig({ ...initialDateConfig, date })
  }

  const convertedFontSize = +fontSize.slice(0, 2)

  const dayRenderer: DatePickerProps['renderDay'] = (date: Date) => {
    const day = date.getDate()

    const hasNotes = dates.some(
      (item) =>
        new Date(item.date).getDate() === day && item.notes !== undefined
    )

    const foundConfig = dates.find(
      (item) => item.date === date.toLocaleDateString()
    )

    const dayColor = () => {
      switch (foundConfig?.type) {
        case 'work':
          return 'green'
        case 'dayOff':
          return 'blue'
        case 'exchange':
          return 'lime'
        case 'sickLeave':
          return 'red'
        case 'vacation':
          return 'orange'
        default:
          return 'blue'
      }
    }

    return (
      <Indicator color="yellow" withBorder disabled={!hasNotes}>
        <Badge
          variant={foundConfig ? 'filled' : 'light'}
          fullWidth
          h={28}
          color={dayColor()}
        >
          <Text fz={convertedFontSize / 1.5}> {day} </Text>
        </Badge>
      </Indicator>
    )
  }

  return (
    <>
      <DatePicker
        defaultValue={new Date()}
        locale={i18n.language}
        p={15}
        styles={{
          calendarHeader: { maxWidth: '100%' },
          calendarHeaderLevel: { fontSize },
          weekday: { fontSize },
          day: {
            padding: 20,
            borderRadius: '0px',
            fontSize,
            ':hover': { background: 'none' },
            '&[data-selected=true]': {
              borderBottom: '2px solid gray',
              background: 'none',
            },
            '&[data-selected=true]:hover': {
              background: 'none',
            },
          },
          month: { width: '100%', height: `${convertedFontSize * 15 + 100}px` },
          monthCell: { textAlign: 'center' },
          yearLevel: { width: '100%' },
          monthsList: { width: '100%' },
          decadeLevel: { width: '100%' },
          yearsList: { width: '100%' },
        }}
        __onDayClick={(_, date) => handleDate(date)}
        onDateChange={(date) =>
          setSelectedDate({
            ...selectedDate,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          })
        }
        renderDay={dayRenderer}
      />

      <DateEdit
        dateConfig={dateConfig}
        resetDateConfig={resetDateConfig}
        opened={opened}
        close={close}
      />

      <Stats selectedDate={selectedDate} />
    </>
  )
}
