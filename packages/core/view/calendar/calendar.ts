import { ValueObject } from '@egodb/domain'
import type { Option } from 'oxide.ts'
import { None, Some } from 'oxide.ts'
import type { Field } from '../../field'
import { FieldKey } from '../../field'
import type { ICalendarSchema } from './calendar.schema'
import type { ICalendar } from './calendar.type'

export class Calendar extends ValueObject<ICalendar> {
  static from(input: ICalendarSchema) {
    return new this({
      fieldId: input.fieldId ? FieldKey.from(input.fieldId) : undefined,
    })
  }

  public get fieldId() {
    return this.props.fieldId
  }

  public set fieldId(fieldId: FieldKey | undefined) {
    this.props.fieldId = fieldId
  }

  public removeField(field: Field): Option<Calendar> {
    if (this.fieldId?.equals(field.key)) {
      const kanban = new Calendar({ ...this, fieldId: undefined })
      return Some(kanban)
    }

    return None
  }
}
