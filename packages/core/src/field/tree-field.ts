import type { ITreeFilterOperator } from '../filter/operators.js'
import type { ITreeFilter } from '../filter/tree.filter.js'
import { BaseReferenceField } from './field.base.js'
import type { ITreeField } from './field.type.js'
import type { IFieldVisitor } from './field.visitor.js'
import { ParentField } from './parent-field.js'
import { TreeFieldValue } from './tree-field-value.js'
import type { ICreateTreeFieldSchema, ICreateTreeFieldValue, TreeFieldType } from './tree-field.type.js'
import { FieldId } from './value-objects/index.js'

export class TreeField extends BaseReferenceField<ITreeField> {
  type: TreeFieldType = 'tree'

  get parentFieldId() {
    return this.props.parentFieldId
  }

  createParentField(name: string = this.name.value + ' Parent'): ParentField {
    const parentField = ParentField.create({
      name,
      treeFieldId: this.id.value,
      displayFieldIds: this.displayFieldIds.map((f) => f.value),
    })

    this.props.parentFieldId = parentField.id

    return parentField
  }

  static create(input: Omit<ICreateTreeFieldSchema, 'type'>): TreeField {
    return new TreeField({
      ...super.createBase(input),
      parentFieldId: FieldId.fromNullableString(input.parentFieldId),
    })
  }

  static unsafeCreate(input: ICreateTreeFieldSchema): TreeField {
    return new TreeField({
      ...super.unsafeCreateBase(input),
      parentFieldId: FieldId.fromNullableString(input.parentFieldId),
    })
  }

  createValue(value: ICreateTreeFieldValue): TreeFieldValue {
    return new TreeFieldValue(value)
  }

  createFilter(operator: ITreeFilterOperator, value: null): ITreeFilter {
    return { operator, value, path: this.id.value, type: 'tree' }
  }

  accept(visitor: IFieldVisitor): void {
    visitor.tree(this)
  }
}
