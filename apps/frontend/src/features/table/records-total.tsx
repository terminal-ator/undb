import { getCurrentTableRecordsTotal } from '@undb/store'
import { Text } from '@undb/ui'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../hooks'

export const RecordsTotal: React.FC = () => {
  const total = useAppSelector(getCurrentTableRecordsTotal)
  const { t } = useTranslation()

  return (
    <Text size="xs" color="gray">
      {t('Total Records', { total })}
    </Text>
  )
}
