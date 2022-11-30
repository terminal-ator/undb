import { createTableCommandInput } from '@egodb/core'
import { Drawer, openConfirmModal, Text, useEgoUITheme, zodResolver } from '@egodb/ui'
import { useAtom } from 'jotai'
import { CreateTableForm } from './create-table-form'
import { CreateTableFormProvider, useCreateTable } from './create-table-form-context'
import { createTableFormDrawerOpened } from './drawer-opened.atom'

export const CreateTableFormDrawer: React.FC = () => {
  const [opened, setOpened] = useAtom(createTableFormDrawerOpened)
  const theme = useEgoUITheme()

  const form = useCreateTable({
    initialValues: {
      name: '',
      schema: [],
    },
    validate: zodResolver(createTableCommandInput),
    validateInputOnBlur: ['name'],
  })

  const reset = () => {
    setOpened(false)
    form.clearErrors()
    form.reset()
    form.resetTouched()
    form.resetDirty()
  }

  const confirm = () =>
    openConfirmModal({
      target: 'body',
      title: 'Please confirm your action',
      children: <Text size="sm">You have unsaved changes. Do you really want to close the panel?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: reset,
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      centered: true,
    })

  return (
    <CreateTableFormProvider form={form}>
      <Drawer
        opened={opened}
        onClose={() => {
          if (form.isDirty()) {
            confirm()
          } else {
            reset()
          }
        }}
        title="New Table"
        padding="xl"
        position="right"
        size={700}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <CreateTableForm onCancel={() => setOpened(false)} />
      </Drawer>
    </CreateTableFormProvider>
  )
}