import type { Field, IOperator } from '@egodb/core'
import { NumberField, TextField } from '@egodb/core'
import type { SelectItem } from '@egodb/ui'
import { Select } from '@egodb/ui'

interface IProps {
  field: Field | null
  value: IOperator | null
  onChange: (operator: IOperator | null) => void
}

export const OperatorSelector: React.FC<IProps> = ({ value, field, onChange }) => {
  let data: SelectItem[] = []

  // TODO: optimize if else
  if (field instanceof TextField) {
    data = [
      { value: '$eq', label: 'equal' },
      { value: '$neq', label: 'not equal' },
      { value: '$contains', label: 'contains' },
      { value: '$starts_with', label: 'startsWith' },
      { value: '$ends_with', label: 'endsWith' },
      { value: '$regex', label: 'regex' },
    ]
  } else if (field instanceof NumberField) {
    data = [
      { value: '$eq', label: 'equal' },
      { value: '$neq', label: 'not equal' },
    ]
  }

  return (
    <Select value={value} disabled={!field} data={data} onChange={(value) => onChange(value as IOperator | null)} />
  )
}