import {
  DuplicateRecordCommand,
  DuplicateRecordCommandHandler as DomainHandler,
  IRecordRepository,
  ITableRepository,
} from '@egodb/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { InjectRecordReposiory, InjectTableReposiory } from '../adapters'

@CommandHandler(DuplicateRecordCommand)
export class DuplicateRecordCommandHandler extends DomainHandler implements ICommandHandler<DuplicateRecordCommand> {
  constructor(
    @InjectTableReposiory()
    protected readonly tableRepo: ITableRepository,

    @InjectRecordReposiory()
    protected readonly recordRepo: IRecordRepository,
  ) {
    super(tableRepo, recordRepo)
  }
}