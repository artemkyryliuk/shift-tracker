import { Text, Modal, Button, Flex, Group } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export default function ConfirmDialog({
  opened,
  close,
  handleConfirmCancel,
  handleConfirmSave,
}: {
  handleConfirmCancel: () => void
  handleConfirmSave: () => void
  opened: boolean
  close: () => void
}) {
  const { t } = useTranslation()

  return (
    <Modal
      title={t('confirmTitle')}
      opened={opened}
      onClose={close}
      centered
      styles={(theme) => ({
        title: { fontSize: 20, color: theme.colors.blue },
      })}
    >
      <Text mt="xl" fz="xl" align="center">
        {t('confirmQuestion')}
      </Text>

      <Flex justify="center" mt="md">
        <Group>
          <Button color="gray" onClick={handleConfirmCancel}>
            {t('no')}
          </Button>
          <Button onClick={handleConfirmSave}> {t('yes')} </Button>
        </Group>
      </Flex>
    </Modal>
  )
}
