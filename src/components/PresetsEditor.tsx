import { useState } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBack2Fill } from 'react-icons/ri'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getDayColor } from '../utils/getDayColor'
import { updateSettings } from '../store/settingsSlice'
import RadioGroup from './RadioGroup'
import TimeField from './TimeField'
import type { Preset } from './types/settings'

export default function PresetsEditor() {
  const settings = useAppSelector((state) => state.settings)
  const { presets } = settings
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [opened, { open, close }] = useDisclosure(false)

  const [presetConfig, setPresetConfig] = useState<Preset>({
    type: '',
    shiftStart: '',
    breakTime: '',
    shiftEnd: '',
  })

  const { type, shiftStart, breakTime, shiftEnd } = presetConfig

  const { colorScheme } = useMantineColorScheme()
  const isLightTheme = colorScheme === 'light'

  const addPreset = () => {
    open()
  }

  const deletePreset = (presetIndex: number) => {
    const updatedSettings = presets.filter((_, index) => index !== presetIndex)
    dispatch(updateSettings({ ...settings, presets: updatedSettings }))
  }

  const handleFieldChange = (field: keyof Preset, value: string) => {
    setPresetConfig((prev) => ({ ...prev!, [field]: value }))
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedPresets = [...presets, presetConfig]
    dispatch(updateSettings({ ...settings, presets: updatedPresets }))

    close()
  }

  return (
    <>
      <Flex mt={10} wrap="wrap" gap={15}>
        {presets?.map(({ type, shiftStart, breakTime, shiftEnd }, index) => (
          <Flex
            key={index}
            pos="relative"
            wrap="wrap"
            align="baseline"
            gap={15}
            p={15}
            fz={20}
            fw={500}
            opacity={isLightTheme ? 1 : 0.75}
            c="#fff"
            bg={getDayColor(type)}
            sx={{
              borderRadius: '0px 0px 0px 20px',
              textTransform: 'uppercase',
            }}
          >
            <Text> {t(type)} </Text>
            {(shiftStart || shiftEnd) && (
              <Text> {`${shiftStart} - ${shiftEnd}`} </Text>
            )}

            {breakTime && <Text> {`${t('break')} ${t(breakTime)}`} </Text>}

            <Box
              pos="absolute"
              top={-10}
              right={-3}
              w={30}
              h={30}
              onClick={() => deletePreset(index)}
            >
              <RiDeleteBack2Fill size={30} />
            </Box>
          </Flex>
        ))}
      </Flex>

      <Group onClick={addPreset}>
        <ActionIcon
          variant="transparent"
          mt={10}
          w={50}
          h={50}
          c={isLightTheme ? '#003f5c' : '#222'}
        >
          <IoIosAddCircleOutline size={50} />
        </ActionIcon>

        <Text mt={15} fz={20}>
          {t('add')}
        </Text>
      </Group>

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={t('addingPreset')}
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
            defaultValue={type}
            value={type}
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

          {(presetConfig.type === 'work' ||
            presetConfig.type === 'exchange') && (
            <>
              <TimeField
                groupName="shiftStart"
                value={shiftStart}
                label={t('shiftStart')}
                onChange={(value) => handleFieldChange('shiftStart', value)}
              />

              <TimeField
                groupName="shiftEnd"
                value={shiftEnd}
                label={t('shiftEnd')}
                onChange={(value) => handleFieldChange('shiftEnd', value)}
              />

              <RadioGroup
                groupName="breakTime"
                defaultValue={breakTime}
                value={breakTime}
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

          <Button
            type="submit"
            disabled={presetConfig.type === '' ? true : false}
            mt="lg"
          >
            {t('save')}
          </Button>
        </form>
      </Modal>
    </>
  )
}
