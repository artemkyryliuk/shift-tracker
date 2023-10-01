export type DateType =
  | 'work'
  | 'dayOff'
  | 'exchange'
  | 'sickLeave'
  | 'vacation'
  | ''

export type Break = 'hour' | 'halfHour' | 'none' | ''

export type DateConfig = {
  date: string
  type: DateType
  shiftStart: string
  break: Break
  shiftEnd: string
  notes?: string
}

export type DateConfigValues = DateConfig['type'] | DateConfig['break']
