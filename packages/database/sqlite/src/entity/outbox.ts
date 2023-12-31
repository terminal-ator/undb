import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core'
import type { IEvent } from '@undb/domain'
import { BaseEntity } from './base.js'

export const OPTBOX_TABLE_NAME = 'undb_outbox'

@Entity({ tableName: OPTBOX_TABLE_NAME })
export class Outbox extends BaseEntity {
  constructor(event: IEvent) {
    super()
    this.uuid = event.id
    this.name = event.name
    this.operatorId = event.operatorId
    this.payload = event.payload
  }

  @PrimaryKey()
  uuid: string

  @Property({ nullable: true })
  name: string

  @Property({ nullable: true })
  operatorId: string

  @Property({ type: JsonType })
  payload: object
}
