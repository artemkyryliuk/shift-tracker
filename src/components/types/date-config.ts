export type DateType =
  | 'work'
  | 'dayOff'
  | 'exchange'
  | 'sickLeave'
  | 'vacation'
  | ''

export type BreakTime = 'hour' | 'halfHour' | 'none' | ''

export type DateConfig = {
  date: string
  type: DateType
  shiftStart: string
  breakTime: BreakTime
  shiftEnd: string
  notes?: string
}

export type DateConfigValues = DateConfig['type'] | DateConfig['breakTime']
