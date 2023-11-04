import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDisclosure } from '@mantine/hooks'
import { Badge, Indicator, Text } from '@mantine/core'
import { DatePicker, DatePickerProps } from '@mantine/dates'
import 'dayjs/locale/uk'

import { useAppSelector } from '../store/hooks'
import { getDayColor } from '../utils/getDayColor'
import DateEdit from './DateEdit'
import Stats from './Stats'
import { findConfig } from '../utils/findConfig'
import type { DateConfig } from './types/date-config'

export default function Calendar() {
  const dates: DateConfig[] = useAppSelector((state) => state.dates)

  const { i18n } = useTranslation()

  const initialDateConfig: DateConfig = {
    date: new Date().toLocaleDateString(),
    type: '',
    shiftStart: '',
    shiftEnd: '',
    breakTime: '',
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

  const dayRenderer: DatePickerProps['renderDay'] = (date: Date) => {
    const day = date.getDate()

    const hasNotes = dates.some(
      (item) =>
        new Date(item.date).getDate() === day && item.notes !== undefined
    )

    const foundConfig = dates.find(
      (item) => item.date === date.toLocaleDateString()
    )

    return (
      <Indicator color="yellow" withBorder disabled={!hasNotes}>
        <Badge
          variant={foundConfig ? 'filled' : 'outline'}
          fullWidth
          h={28}
          color={getDayColor(foundConfig?.type)}
          styles={{
            root: {
              border: 'none',
              borderRadius: `${foundConfig ? 20 : 0}px`,
              fontSize: 20,
              fontWeight: 700,
            },
          }}
        >
          <Text> {day} </Text>
        </Badge>
      </Indicator>
    )
  }

  return (
    <>
      <DatePicker
        defaultValue={new Date()}
        locale={i18n.language}
        mt={120}
        p={15}
        styles={{
          calendarHeader: { maxWidth: '100%' },
          calendarHeaderLevel: { fontSize: 24 },
          weekday: { fontSize: 24 },
          day: {
            borderRadius: '0px',
            ':hover': { background: 'none' },
            '&[data-selected=true]': {
              border: '2px solid #003f5c',
              borderRadius: '50px',
              background: 'none',
              width: 40,
              height: 40,
              boxShadow: '2px 2px 10px 0px #00000088',
            },
            '&[data-selected=true]:hover': {
              background: 'none',
            },
          },
          month: { width: '100%', height: 350 },
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
