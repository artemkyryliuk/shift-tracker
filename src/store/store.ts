import { configureStore } from '@reduxjs/toolkit'
import datesReducer from './datesSlice'
import configReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    settings: configReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
