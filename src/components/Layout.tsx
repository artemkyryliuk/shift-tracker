import { NavLink } from 'react-router-dom'
import {
  ActionIcon,
  Container,
  Flex,
  Group,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import '../utils/i18n'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()

  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === 'light'

  return (
    <Container p={0}>
      <Flex
        justify="space-between"
        align="center"
        p={15}
        c="white"
        bg={light ? 'blue' : 'dark'}
      >
        <Text fz={20} fw={700}>
          {t('appName')}
        </Text>

        <Group spacing={20}>
          <NavLink to="/">
            <ActionIcon variant="transparent" w={30} h={30} c="white">
              <FaRegCalendarAlt size={30} />
            </ActionIcon>
          </NavLink>

          <NavLink to="/settings">
            <ActionIcon variant="transparent" w={30} h={30} c="white">
              <IoMdSettings size={30} />
            </ActionIcon>
          </NavLink>
        </Group>
      </Flex>
      {children}
    </Container>
  )
}
