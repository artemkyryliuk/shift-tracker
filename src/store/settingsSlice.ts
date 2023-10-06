import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { Settings } from '../components/types/settings'

const initialState: Settings = {
  colorScheme: 'light',
  fontSize: '20px',
  salary: 0,
  dayColors: {
    work: 'blue',
    dayOff: 'green',
  },
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (_, action: PayloadAction<Settings>) => {
      return action.payload
    },
  },
})

export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
