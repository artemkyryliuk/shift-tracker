import { NavLink } from 'react-router-dom'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'

export default function SelectPageButton({
  href,
  icon,
}: {
  href: string
  icon: React.ReactNode
}) {
  const { colorScheme } = useMantineColorScheme()
  const isLightTheme = colorScheme === 'light'

  return (
    <NavLink to={href} style={{ textDecoration: 'none' }}>
      <ActionIcon
        variant="transparent"
        w={30}
        h={30}
        c={isLightTheme ? '#fff' : '#bbb'}
      >
        {icon}
      </ActionIcon>
    </NavLink>
  )
}
