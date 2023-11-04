import { Container, Flex, Text, useMantineColorScheme } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../store/hooks'
import { DateConfig } from './types/date-config'

export default function Stats({
  selectedDate,
}: {
  selectedDate: { month: number; year: number }
}) {
  const dates = useAppSelector((state) => state.dates)
  const { salary } = useAppSelector((state) => state.settings)

  const { t } = useTranslation()

  const { colorScheme } = useMantineColorScheme()
  const isLightTheme = colorScheme === 'light'

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
        switch (item.breakTime) {
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

  const totalSalary = getWorkingHours().hours * salary

  const getTodayNotes = () => {
    const foundTodayNotes = dates.find(
      (item) => item.date === new Date().toLocaleDateString()
    )

    if (foundTodayNotes) {
      return foundTodayNotes.notes
    }

    return null
  }

  return (
    <Container
      fluid
      p={30}
      sx={{
        background: isLightTheme ? '#fff' : '#222',
        boxShadow: '0px 0px 20px 0px #00000033',
      }}
    >
      {getTodayNotes() && (
        <Text
          mb={10}
          p={10}
          bg={isLightTheme ? '#eee' : '#333'}
          sx={{ borderRadius: 10 }}
        >
          {getTodayNotes()}
        </Text>
      )}

      {[
        { label: t('calendarDays'), value: getDaysInMonth() },
        { label: t('workingDays'), value: getDaysNumber('work') },
        { label: t('dayOffDays'), value: getDaysNumber('dayOff') },
        { label: t('exchangeDays'), value: getDaysNumber('exchange') },
        { label: t('sickLeaveDays'), value: getDaysNumber('sickLeave') },
        { label: t('vacationDays'), value: getDaysNumber('vacation') },
        {
          label: t('workingHours'),
          value:
            getWorkingHours().hours + getWorkingHours().minutes > 0
              ? `${getWorkingHours().hours} ${t('hours')} ${
                  getWorkingHours().minutes
                } ${t('minutes')}`
              : 0,
        },
        {
          label: t('salary'),
          value: totalSalary !== 0 ? `${totalSalary} ${t('hrn')}` : 0,
        },
      ].map(({ label, value }) => {
        if (value !== 0) {
          return (
            <Flex key={label} justify="space-between" fz={20}>
              <Text> {`${label}:`} </Text>
              <Text> {value} </Text>
            </Flex>
          )
        }
      })}
    </Container>
  )
}
