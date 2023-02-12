import type { CommandProps } from '@egodb/domain'
import { Command } from '@egodb/domain'
import type { IRootFilter } from '../../filter/index.js'
import type { ISetFilterCommandInput } from './set-filters.command.interface.js'

export class SetFitlersCommand extends Command implements ISetFilterCommandInput {
  readonly tableId: string
  readonly viewKey?: string
  readonly filter: IRootFilter | null

  constructor(props: CommandProps<ISetFilterCommandInput>) {
    super(props)
    this.tableId = props.tableId
    this.viewKey = props.viewKey
    this.filter = props.filter
  }
}
