import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { DateConfig } from '../components/types/date-config'

const datesSlice = createSlice({
  name: 'dates',
  initialState: [] as DateConfig[],
  reducers: {
    updateDates: (_, action: PayloadAction<DateConfig[]>) => {
      return action.payload
    },
  },
})

export const { updateDates } = datesSlice.actions

export default datesSlice.reducer
