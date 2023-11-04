import { useEffect, useState } from 'react'
import { Button, Flex, Group, Modal, Textarea } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateDates } from '../store/datesSlice'
import { useFormattedDate } from './hooks/useFormattedDate'
import RadioGroup from './RadioGroup'
import TimeField from './TimeField'
import PresetPicker from './PresetPicker'
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
  const dates = useAppSelector((state) => state.dates)
  const { presets } = useAppSelector((state) => state.settings)

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [changedDateConfig, setChangedDateConfig] =
    useState<DateConfig>(dateConfig)

  useEffect(() => {
    setChangedDateConfig(dateConfig)
  }, [dateConfig])

  const formattedDate = useFormattedDate(dateConfig.date)

  const handleFieldChange = (field: keyof DateConfig, value: string) => {
    setChangedDateConfig((prev) => ({ ...prev!, [field]: value }))
  }

  const handlePresetChange = (presetIndex: number): void => {
    const presetConfig = presets[presetIndex]
    setChangedDateConfig((prev) => ({ ...prev!, ...presetConfig }))
  }

  const closeModal = () => {
    close()
    setTimeout(() => resetDateConfig(dateConfig.date), 200)
  }

  const handleClearDateConfig = () => {
    const newDates: DateConfig[] = dates.filter(
      (item) => item.date !== dateConfig.date
    )
    dispatch(updateDates(newDates))

    closeModal()
  }

  const handleCancel = () => {
    setChangedDateConfig(dateConfig)
    closeModal()
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const existingDateConfig = dates.find(
      (item) => item.date === dateConfig.date
    )

    if (existingDateConfig) {
      const newDates = dates.map((item) =>
        item.date === dateConfig.date ? changedDateConfig : item
      )
      dispatch(updateDates(newDates))
    } else {
      dispatch(updateDates([...dates, changedDateConfig]))
    }

    closeModal()
  }

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <Modal
        title={formattedDate}
        opened={opened}
        onClose={handleClose}
        centered
        styles={(theme) => ({
          title: {
            fontSize: 24,
            fontFamily: 'Lobster',
            color: theme.colors.blue,
          },
        })}
      >
        <form onSubmit={handleSave}>
          <RadioGroup
            groupName="type"
            defaultValue={dateConfig.type}
            value={changedDateConfig.type}
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
                value={changedDateConfig.shiftStart}
                label={t('shiftStart')}
                onChange={(value) => handleFieldChange('shiftStart', value)}
              />

              <TimeField
                groupName="shiftEnd"
                value={changedDateConfig.shiftEnd}
                label={t('shiftEnd')}
                onChange={(value) => handleFieldChange('shiftEnd', value)}
              />

              <RadioGroup
                groupName="breakTime"
                defaultValue={dateConfig.breakTime}
                value={changedDateConfig.breakTime}
                label={t('break')}
                items={[
                  { value: 'hour', label: t('hour') },
                  { value: 'halfHour', label: t('halfHour') },
                  { value: 'none', label: t('none') },
                ]}
                onChange={(value) => handleFieldChange('breakTime', value)}
              />
            </>
          )}

          <Textarea
            value={changedDateConfig.notes}
            label={t('notes')}
            mt="md"
            styles={{
              label: { fontSize: 20 },
              input: { marginTop: 10, fontSize: 20 },
            }}
            onChange={(e) => handleFieldChange('notes', e.target.value)}
          />

          <PresetPicker onChange={handlePresetChange} />

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
    </>
  )
}
