import { Attachment } from './attachment.js'
import { Field, fieldEntities } from './field.js'
import { Option } from './option.js'
import { Outbox } from './outbox.js'
import { Table } from './table.js'
import { User } from './user.js'
import { viewEntities } from './view.js'
import { visualizationEntities } from './visualization.js'
import { Webhook } from './webhook.js'

export * from './field.js'
export * from './option.js'
export * from './outbox.js'
export * from './table.js'
export * from './user.js'
export * from './webhook.js'

export const entities = [
  Table,
  ...viewEntities,
  Field,
  ...fieldEntities,
  Option,
  Attachment,
  User,
  ...visualizationEntities,
  Outbox,
  Webhook,
]
