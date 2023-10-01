import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDisclosure } from '@mantine/hooks'
import { Indicator } from '@mantine/core'
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

  const indicatorSize = +fontSize.slice(0, 2) / 2.5

  const dayRenderer: DatePickerProps['renderDay'] = (date: Date) => {
    const day = date.getDate()
    const dayWithNotes = 0

    return (
      <Indicator
        size={indicatorSize}
        color="yellow"
        disabled={day !== dayWithNotes}
      >
        <div> {day} </div>
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
          day: { fontSize },
          month: { width: '100%' },
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
