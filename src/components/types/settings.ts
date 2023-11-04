import type { DateConfig } from './date-config'

export type Preset = Omit<DateConfig, 'date' | 'notes'>

export type Settings = {
  colorScheme: 'light' | 'dark'
  language?: 'uk' | 'en'
  salary: number
  presets: Preset[]
}

export type SettingsValues = Settings[keyof Settings]
