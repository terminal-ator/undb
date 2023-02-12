import type { CommandProps } from '@egodb/domain'
import { Command } from '@egodb/domain'
import type { ISetFieldWidthCommandInput } from './set-field-width.command.interface.js'

export class SetFieldWidthCommand extends Command implements ISetFieldWidthCommandInput {
  public readonly tableId: string
  public readonly viewKey?: string
  public readonly fieldId: string
  public readonly width: number

  constructor(props: CommandProps<ISetFieldWidthCommandInput>) {
    super(props)
    this.tableId = props.tableId
    this.viewKey = props.viewKey
    this.fieldId = props.fieldId
    this.width = props.width
  }
}
