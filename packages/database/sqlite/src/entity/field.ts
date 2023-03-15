import type {
  Field as CoreField,
  IAutoIncrementFieldQuerySchema,
  IBoolFieldQuerySchema,
  IColorFieldQuerySchema,
  ICreatedAtFieldQueryScheam,
  IDateFieldQuerySchema,
  IDateRangeFieldQuerySchema,
  IEmailFieldQuerySchema,
  IFieldType,
  IIdFieldQuerySchema,
  INumberFieldQuerySchema,
  IParentFieldQuerySchema,
  IQueryFieldSchema,
  IRatingFieldQuerySchema,
  IReferenceFieldQuerySchema,
  ISelectFieldQuerySchema,
  IStringFieldQuerySchema,
  ITreeFieldQuerySchema,
  IUpdatedAtFieldQuerySchema,
} from '@egodb/core'
import {
  AutoIncrementField as CoreAutoIncrementField,
  BoolField as CoreBoolField,
  ColorField as CoreColorField,
  CreatedAtField as CoreCreatedAtField,
  DateField as CoreDateField,
  DateRangeField as CoreDateRangeField,
  EmailField as CoreEmailField,
  IdField as CoreIdField,
  NumberField as CoreNumberField,
  ParentField as CoreParentField,
  RatingField as CoreRatingField,
  ReferenceField as CoreReferenceField,
  SelectField as CoreSelectField,
  StringField as CoreStringField,
  TreeField as CoreTreeField,
  UpdatedAtField as CoreUpdatedAtField,
} from '@egodb/core'
import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  SmallIntType,
} from '@mikro-orm/core'
import { BaseEntity } from './base.js'
import { Option } from './option.js'
import { Table } from './table.js'

@Entity({ tableName: 'ego_field', abstract: true, discriminatorColumn: 'type' })
export abstract class Field extends BaseEntity {
  constructor(table: Table, field: CoreField) {
    super()
    this.id = field.id.value
    this.table = table
    this.name = field.name.value
    this.type = field.type
    this.system = field.system
    this.description = field.description?.value
  }

  @PrimaryKey()
  id: string

  @ManyToOne(() => Table, { cascade: [Cascade.ALL] })
  table: Table

  @Property()
  name: string

  @Property({ nullable: true })
  description?: string

  @Property({ type: 'bool', default: false })
  system = false

  @Enum({
    items: [
      'id',
      'created-at',
      'updated-at',
      'auto-increment',
      'string',
      'email',
      'color',
      'number',
      'date',
      'select',
      'bool',
      'date-range',
      'reference',
      'tree',
      'parent',
      'rating',
    ],
  })
  type: IFieldType

  abstract toDomain(): CoreField
  abstract toQuery(): IQueryFieldSchema
}

@Entity({ discriminatorValue: 'id' })
export class IdField extends Field {
  toDomain(): CoreIdField {
    return CoreIdField.unsafeCreate({
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'id',
    })
  }

  toQuery(): IIdFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'id',
    }
  }
}

@Entity({ discriminatorValue: 'created-at' })
export class CreatedAtField extends Field {
  constructor(table: Table, field: CoreCreatedAtField) {
    super(table, field)
    this.format = field.formatString
  }

  @Property()
  format: string

  toDomain(): CoreCreatedAtField {
    return CoreCreatedAtField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'created-at',
      description: this.description,
      format: this.format,
    })
  }

  toQuery(): ICreatedAtFieldQueryScheam {
    return {
      id: this.id,
      name: this.name,
      type: 'created-at',
      description: this.description,
      format: this.format,
    }
  }
}

@Entity({ discriminatorValue: 'updated-at' })
export class UpdatedAtField extends Field {
  constructor(table: Table, field: CoreUpdatedAtField) {
    super(table, field)
    this.format = field.formatString
  }

  @Property()
  format: string

  toDomain(): CoreUpdatedAtField {
    return CoreUpdatedAtField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'updated-at',
      description: this.description,
      format: this.format,
    })
  }

  toQuery(): IUpdatedAtFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'updated-at',
      description: this.description,
      format: this.format,
    }
  }
}

@Entity({ discriminatorValue: 'auto-increment' })
export class AutoIncrementField extends Field {
  toDomain(): CoreAutoIncrementField {
    return CoreAutoIncrementField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'auto-increment',
      description: this.description,
    })
  }

  toQuery(): IAutoIncrementFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'auto-increment',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'string' })
export class StringField extends Field {
  toDomain(): CoreStringField {
    return CoreStringField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'string',
      description: this.description,
    })
  }

  toQuery(): IStringFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'string',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'email' })
export class EmailField extends Field {
  toDomain(): CoreEmailField {
    return CoreEmailField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'email',
      description: this.description,
    })
  }

  toQuery(): IEmailFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'email',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'color' })
export class ColorField extends Field {
  toDomain(): CoreColorField {
    return CoreColorField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'color',
      description: this.description,
    })
  }

  toQuery(): IColorFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'color',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'number' })
export class NumberField extends Field {
  toDomain(): CoreNumberField {
    return CoreNumberField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'number',
      description: this.description,
    })
  }

  toQuery(): INumberFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'number',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'rating' })
export class RatingField extends Field {
  constructor(table: Table, field: CoreRatingField) {
    super(table, field)
    this.max = field.max
  }

  @Property({ type: SmallIntType })
  max: number

  toDomain(): CoreRatingField {
    return CoreRatingField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'rating',
      max: this.max,
      description: this.description,
    })
  }

  toQuery(): IRatingFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'rating',
      max: this.max,
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'bool' })
export class BoolField extends Field {
  toDomain(): CoreBoolField {
    return CoreBoolField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'bool',
      description: this.description,
    })
  }

  toQuery(): IBoolFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'bool',
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'date' })
export class DateField extends Field {
  constructor(table: Table, field: CoreDateField) {
    super(table, field)
    this.format = field.formatString
  }

  @Property()
  format: string

  toDomain(): CoreDateField {
    return CoreDateField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'date',
      format: this.format,
      description: this.description,
    })
  }

  toQuery(): IDateFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'date',
      format: this.format,
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'date-range' })
export class DateRangeField extends Field {
  constructor(table: Table, field: CoreDateRangeField) {
    super(table, field)
    this.format = field.formatString
  }

  @Property()
  format: string

  toDomain(): CoreDateRangeField {
    return CoreDateRangeField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'date-range',
      format: this.format,
      description: this.description,
    })
  }

  toQuery(): IDateRangeFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'date-range',
      format: this.format,
      description: this.description,
    }
  }
}

@Entity({ discriminatorValue: 'select' })
export class SelectField extends Field {
  @OneToMany(() => Option, (option) => option.field, { orphanRemoval: true, cascade: [Cascade.ALL] })
  options = new Collection<Option>(this)

  toDomain(): CoreSelectField {
    return CoreSelectField.unsafeCreate({
      id: this.id,
      name: this.name,
      type: 'select',
      description: this.description,
      // FIXME: should check?
      options: this.options.isInitialized()
        ? this.options.getItems().map((o) => ({
            key: o.key,
            name: o.name,
            color: {
              name: o.color.name,
              shade: o.color.shade,
            },
          }))
        : [],
    })
  }

  toQuery(): ISelectFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      type: 'select',
      description: this.description,
      options: this.options.getItems().map((o) => ({
        key: o.key,
        name: o.name,
        color: {
          name: o.color.name,
          shade: o.color.shade,
        },
      })),
    }
  }
}

@Entity({ discriminatorValue: 'reference' })
export class ReferenceField extends Field {
  constructor(table: Table, field: CoreReferenceField) {
    super(table, field)
  }

  @ManyToOne(() => Table)
  foreignTable?: Table

  @ManyToMany({ entity: () => Field, owner: true })
  displayFields = new Collection<Field>(this)

  toDomain(): CoreReferenceField {
    return CoreReferenceField.unsafeCreate({
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'reference',
      foreignTableId: this.foreignTable?.id,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    })
  }

  toQuery(): IReferenceFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'reference',
      foreignTableId: this.foreignTable?.id,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    }
  }
}

@Entity({ discriminatorValue: 'tree' })
export class TreeField extends Field {
  constructor(table: Table, field: CoreTreeField) {
    super(table, field)
    this.parentFieldId = field.parentFieldId!.value
  }

  @Property()
  parentFieldId: string

  @ManyToMany({ entity: () => Field, owner: true })
  displayFields = new Collection<Field>(this)

  toDomain(): CoreTreeField {
    return CoreTreeField.unsafeCreate({
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'tree',
      parentFieldId: this.parentFieldId,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    })
  }

  toQuery(): ITreeFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'tree',
      parentFieldId: this.parentFieldId,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    }
  }
}

@Entity({ discriminatorValue: 'parent' })
export class ParentField extends Field {
  constructor(table: Table, field: CoreParentField) {
    super(table, field)
    this.treeFieldId = field.treeFieldId.value
  }

  @Property()
  treeFieldId!: string

  @ManyToMany({ entity: () => Field, owner: true })
  displayFields = new Collection<Field>(this)

  toDomain(): CoreParentField {
    return CoreParentField.unsafeCreate({
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'parent',
      treeFieldId: this.treeFieldId,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    })
  }

  toQuery(): IParentFieldQuerySchema {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'parent',
      treeFieldId: this.treeFieldId,
      displayFieldIds: this.displayFields.getItems().map((f) => f.id),
    }
  }
}

export type IField =
  | IdField
  | CreatedAtField
  | UpdatedAtField
  | AutoIncrementField
  | StringField
  | EmailField
  | ColorField
  | NumberField
  | BoolField
  | DateField
  | DateRangeField
  | SelectField
  | ReferenceField
  | TreeField
  | ParentField
  | RatingField

export const fieldEntities = [
  IdField,
  CreatedAtField,
  UpdatedAtField,
  AutoIncrementField,
  StringField,
  EmailField,
  ColorField,
  NumberField,
  BoolField,
  DateField,
  DateRangeField,
  SelectField,
  ReferenceField,
  TreeField,
  ParentField,
  RatingField,
]
