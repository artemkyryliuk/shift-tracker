import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { Settings } from '../components/types/settings'

const initialState: Settings = {
  colorScheme: 'light',
  fontSize: '20px',
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
