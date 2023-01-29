import { CompositeSpecification } from '@egodb/domain'
import type { Result } from 'oxide.ts'
import { Ok } from 'oxide.ts'
import type { Record } from '../record'
import type { IRecordVisitor } from './interface'

export class WithRecordAutoIncrement extends CompositeSpecification<Record, IRecordVisitor> {
  constructor(public readonly n: number) {
    super()
  }

  isSatisfiedBy(t: Record): boolean {
    return this.n === t.autoIncrement
  }

  mutate(r: Record): Result<Record, string> {
    r.autoIncrement = this.n
    return Ok(r)
  }

  accept(v: IRecordVisitor): Result<void, string> {
    v.autoIncrement(this)
    return Ok(undefined)
  }
}