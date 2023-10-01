import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'

import { useAppDispatch, useAppSelector } from './store/hooks'
import { updateSettings } from './store/settingsSlice'
import Loader from './components/Loader'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import type { Settings } from './components/types/settings'

export default function App() {
  const settings: Settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  const toggleColorScheme = () => {
    const colorScheme = settings.colorScheme === 'light' ? 'dark' : 'light'

    dispatch(updateSettings({ ...settings, colorScheme }))
  }

  return (
    <ColorSchemeProvider
      colorScheme={settings.colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: settings.colorScheme }}
      >
        <Suspense fallback={<Loader />}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Layout>
        </Suspense>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
