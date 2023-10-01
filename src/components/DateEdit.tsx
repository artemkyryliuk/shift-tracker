import { useEffect, useState } from 'react'
import { Button, Flex, Group, Modal, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateDates } from '../store/datesSlice'
import RadioGroup from './RadioGroup'
import TimeField from './TimeField'
import ConfirmDialog from './ConfirmDialog'
import type { DateConfig } from './types/date-config'

export default function DateEdit({
  dateConfig,
  resetDateConfig,
  opened,
  close,
}: {
  dateConfig: DateConfig
  resetDateConfig: (date: string) => void
  opened: boolean
  close: () => void
}) {
  const dates: DateConfig[] = useAppSelector((state) => state.dates)
  const fontSize: string = useAppSelector((state) => state.settings.fontSize)
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  const [changedDateConfig, setChangedDateConfig] =
    useState<DateConfig>(dateConfig)

  useEffect(() => {
    setChangedDateConfig(dateConfig)
  }, [dateConfig])

  const [confirmOpened, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false)

  const formattedDate: string = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(dateConfig.date))

  const handleFieldChange = (field: keyof DateConfig, value: string) => {
    setChangedDateConfig((prev) => ({ ...prev!, [field]: value }))
  }

  const saveChanges = () => {
    const existingDateConfig = dates.find(
      (item) => item.date === dateConfig.date
    )

    if (existingDateConfig) {
      const newDates: DateConfig[] = dates.map((item) =>
        item.date === changedDateConfig.date ? changedDateConfig : item
      )
      dispatch(updateDates(newDates))
    } else {
      dispatch(updateDates([...dates, changedDateConfig]))
    }

    resetDateConfig(dateConfig.date)
  }

  const closeModals = () => {
    closeConfirm()
    close()
    resetDateConfig(dateConfig.date)
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveChanges()
    close()
  }

  const handleCancel = () => {
    setChangedDateConfig(dateConfig)
    close()
    resetDateConfig(dateConfig.date)
  }

  const handleClose = () => {
    if (JSON.stringify(dateConfig) !== JSON.stringify(changedDateConfig)) {
      openConfirm()
    } else {
      close()
    }

    resetDateConfig(dateConfig.date)
  }

  const handleClearDateConfig = () => {
    const newDates: DateConfig[] = dates.filter(
      (item) => item.date !== dateConfig.date
    )
    dispatch(updateDates(newDates))
    close()
    resetDateConfig(dateConfig.date)
  }

  const handleConfirmCancel = () => {
    setChangedDateConfig(dateConfig)
    closeModals()
  }

  const handleConfirmSave = () => {
    saveChanges()
    closeModals()
  }

  return (
    <>
      <Modal
        title={formattedDate}
        opened={opened}
        onClose={handleClose}
        centered
        styles={(theme) => ({
          title: { fontSize, color: theme.colors.blue },
        })}
      >
        <form onSubmit={handleSave}>
          <RadioGroup
            groupName="type"
            defaultValue={dateConfig.type}
            label={t('dateType')}
            items={[
              { value: 'work', label: t('work') },
              { value: 'dayOff', label: t('dayOff') },
              { value: 'exchange', label: t('exchange') },
              { value: 'sickLeave', label: t('sickLeave') },
              { value: 'vacation', label: t('vacation') },
            ]}
            onChange={(value) => handleFieldChange('type', value)}
          />

          {(changedDateConfig.type === 'work' ||
            changedDateConfig.type === 'exchange') && (
            <>
              <TimeField
                groupName="shiftStart"
                defaultValue={dateConfig.shiftStart}
                label={t('shiftStart')}
                onChange={(value) => handleFieldChange('shiftStart', value)}
              />

              <TimeField
                groupName="shiftEnd"
                defaultValue={dateConfig.shiftEnd}
                label={t('shiftEnd')}
                onChange={(value) => handleFieldChange('shiftEnd', value)}
              />

              <RadioGroup
                groupName="break"
                defaultValue={dateConfig.break}
                label={t('break')}
                items={[
                  { value: 'hour', label: t('hour') },
                  { value: 'halfHour', label: t('halfHour') },
                  { value: 'none', label: t('none') },
                ]}
                onChange={(value) => handleFieldChange('break', value)}
              />
            </>
          )}

          <Textarea label={t('notes')} mt="md" />

          <Flex mt="md" justify="space-between" align="center">
            <Button color="cyan" onClick={handleClearDateConfig}>
              {t('null')}
            </Button>

            <Flex justify="flex-end">
              <Group>
                <Button color="gray" onClick={handleCancel}>
                  {t('cancel')}
                </Button>
                <Button type="submit">{t('save')}</Button>
              </Group>
            </Flex>
          </Flex>
        </form>
      </Modal>

      <ConfirmDialog
        opened={confirmOpened}
        close={closeConfirm}
        handleConfirmCancel={handleConfirmCancel}
        handleConfirmSave={handleConfirmSave}
      />
    </>
  )
}
