import type { JsonValue } from 'type-fest'
import type { IAverageFieldValue } from './average-field.type.js'
import { FieldValueBase } from './field-value.base.js'
import type { IFieldValueVisitor } from './field-value.visitor.js'

export class AverageFieldValue extends FieldValueBase<IAverageFieldValue> {
  get json(): JsonValue {
    return this.props.value
  }

  constructor(value: IAverageFieldValue) {
    super({ value })
  }

  accept(visitor: IFieldValueVisitor): void {
    visitor.average(this)
  }
}
