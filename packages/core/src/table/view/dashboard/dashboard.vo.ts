import { ValueObject } from '@undb/domain'
import type { ICreateDashboardSchema, IDashboard } from './dashboard.type.js'
import { Widget } from './widget.vo.js'

export class Dashboard extends ValueObject<IDashboard> {
  public get widgets() {
    return this.props.widgets
  }

  public set widgets(widgets: Widget[]) {
    this.props.widgets = widgets
  }

  static from(input: ICreateDashboardSchema): Dashboard {
    return new Dashboard({
      widgets: input.widgets.map((widget) => Widget.create(widget)),
    })
  }

  public toJSON() {
    return {
      widgets: this.widgets.map((widget) => widget.duplicate().toJSON()),
    }
  }
}
