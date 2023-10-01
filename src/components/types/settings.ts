export type Settings = {
  colorScheme: 'light' | 'dark'
  language?: 'uk' | 'en'
  fontSize: '16px' | '20px' | '24px' | '28px'
  salary: number
}

export type SettingsValues = Settings[keyof Settings]
