import {
  Box,
  Container,
  Flex,
  Group,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'

import SelectPageButton from './SelectPageButton'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import '../utils/i18n'
import { useFormattedDate } from './hooks/useFormattedDate'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()

  const { colorScheme } = useMantineColorScheme()
  const isLightTheme = colorScheme === 'light'

  return (
    <Container
      fluid
      p={0}
      sx={{
        background: `linear-gradient(to right bottom, ${
          isLightTheme ? `#eef, #fff` : `#222, #333`
        })`,
        overflow: 'hidden',
      }}
    >
      <Box
        pos="fixed"
        w="100%"
        px={30}
        py={15}
        bg={isLightTheme ? '#003f5c' : '#222'}
        sx={{ boxShadow: '0px 0px 10px 0px #00000077', zIndex: 200 }}
      >
        <Flex justify="space-between" align="center">
          <Text ff="Lobster" fz={32} c={isLightTheme ? '#fff' : '#bbb'}>
            {t('appName')}
          </Text>

          <Group>
            <SelectPageButton href="/" icon={<FaRegCalendarAlt size={30} />} />

            <SelectPageButton
              href="/settings"
              icon={<IoMdSettings size={30} />}
            />
          </Group>
        </Flex>

        <Text fz={20} c={isLightTheme ? '#ff4' : '#993'}>
          {useFormattedDate(new Date().toLocaleString())}
        </Text>
      </Box>
      {children}
    </Container>
  )
}
