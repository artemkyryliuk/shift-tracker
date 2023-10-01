import { Container, Flex, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../store/hooks'
import { DateConfig } from './types/date-config'

export default function Stats({
  selectedDate,
}: {
  selectedDate: { month: number; year: number }
}) {
  const dates = useAppSelector((state) => state.dates)
  const { fontSize, salary } = useAppSelector((state) => state.settings)

  const { t } = useTranslation()

  const getDaysInMonth = () => {
    const nextMonth = new Date(selectedDate.year, selectedDate.month, 0)

    return nextMonth.getDate()
  }

  const getDatesInMonth = () => {
    const foundDates = dates.filter((item) => {
      const date = new Date(item.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${month}-${year}` === `${selectedDate.month}-${selectedDate.year}`
    })

    return foundDates
  }

  const getDaysNumber = (type: DateConfig['type']) => {
    const foundDates = getDatesInMonth().filter((item) => item.type === type)

    return foundDates.length
  }

  const getWorkingHours = () => {
    const workingDates = getDatesInMonth().filter(
      (item) => item.type === 'work'
    )

    const totalWorkingMinutes = workingDates.reduce((acc, item) => {
      const startTime = item.shiftStart.split(':')
      const endTime = item.shiftEnd.split(':')

      const startMinutes = +startTime[0] * 60 + +startTime[1]
      const endMinutes = +endTime[0] * 60 + +endTime[1]

      const getBreakMinutes = () => {
        switch (item.break) {
          case 'hour':
            return 60
          case 'halfHour':
            return 30
          case 'none':
            return 0
          default:
            return 0
        }
      }

      let workingMinutes = 0

      if (startMinutes <= endMinutes) {
        workingMinutes = endMinutes - startMinutes - getBreakMinutes()
      } else {
        workingMinutes = 24 * 60 - startMinutes + endMinutes - getBreakMinutes()
      }

      return acc + workingMinutes
    }, 0)

    const hours = Math.floor(totalWorkingMinutes / 60)
    const minutes = totalWorkingMinutes - hours * 60

    return { hours, minutes }
  }

  return (
    <Container p={30}>
      {[
        { label: t('calendarDays'), value: getDaysInMonth() },
        { label: t('workingDays'), value: getDaysNumber('work') },
        { label: t('dayOffDays'), value: getDaysNumber('dayOff') },
        { label: t('exchangeDays'), value: getDaysNumber('exchange') },
        { label: t('sickLeaveDays'), value: getDaysNumber('sickLeave') },
        { label: t('vacationDays'), value: getDaysNumber('vacation') },
        {
          label: t('workingHours'),
          value: `${getWorkingHours().hours} ${t('hours')} ${
            getWorkingHours().minutes
          } ${t('minutes')}`,
        },
        {
          label: t('salary'),
          value: `${getWorkingHours().hours * salary} ${t('hrn')}`,
        },
      ].map(({ label, value }) => {
        if (value !== 0) {
          return (
            <Flex key={label} justify="space-between">
              <Text fz={fontSize}> {`${label}:`} </Text>
              <Text fz={fontSize}> {value} </Text>
            </Flex>
          )
        }
      })}
    </Container>
  )
}
