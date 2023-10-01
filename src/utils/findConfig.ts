import type { DateConfig } from '../components/types/date-config'

export const findConfig = (dates: DateConfig[], dateString: string) => {
  return dates.find((item) => item.date === dateString)
}
