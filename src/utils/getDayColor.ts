import { DateConfig } from '../components/types/date-config'

export const getDayColor = (dateType?: DateConfig['type']) => {
  switch (dateType) {
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
      return 'gray'
  }
}
