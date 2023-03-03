import { ActionIcon, Group, IconSortAscending, IconSortDescending, Text, Tooltip } from '@egodb/ui'
import styled from '@emotion/styled'
import type { TColumn, THeader } from './interface'
import type { Field } from '@egodb/core'
import { memo } from 'react'
import { FieldIcon } from '../field-inputs/field-Icon'
import { TableUIFieldMenu } from '../table/table-ui-field-menu'
import { useSetFieldSortMutation, useSetFieldWidthMutation } from '@egodb/store'
import { useCurrentTable } from '../../hooks/use-current-table'
import { useCurrentView } from '../../hooks/use-current-view'

const ResizerLine = styled.div<{ isResizing: boolean }>`
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  background-color: #2d7ff9;
  opacity: ${(props) => (props.isResizing ? 1 : 0)};
`

const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 3px;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;

  :hover {
    ${ResizerLine} {
      opacity: 1;
    }
  }
`

interface IProps {
  header: THeader
  column: TColumn
  field: Field
}

export const Th: React.FC<IProps> = memo(({ header, field, column }) => {
  const table = useCurrentTable()
  const view = useCurrentView()
  const direction = view.getFieldSort(field.id.value).into()
  const [setFieldWidth] = useSetFieldWidthMutation()
  const [setFieldSort] = useSetFieldSortMutation()

  const onSetFieldWidth = (fieldId: string, width: number) => {
    setFieldWidth({
      tableId: table.id.value,
      fieldId,
      viewId: view.id.value,
      width,
    })
  }

  return (
    <th
      data-field-id={field.id.value}
      key={header.id}
      style={{
        position: 'relative',
        width: header.getSize(),
      }}
    >
      <Group position="apart">
        <Group spacing="xs">
          <FieldIcon type={field.type} size={14} />
          <Text fz="sm" fw={500}>
            {field.name.value}
          </Text>
        </Group>

        <Group spacing={5}>
          {direction && (
            <Tooltip label={`Sort by ${direction === 'asc' ? 'descending' : 'ascending'} `}>
              <ActionIcon
                variant="light"
                sx={{
                  transition: 'transform 320ms ease',
                  ':hover': {
                    transform: 'rotate(180deg)',
                  },
                }}
                onClick={() => {
                  setFieldSort({
                    tableId: table.id.value,
                    viewId: view.id.value,
                    fieldId: field.id.value,
                    direction: direction === 'asc' ? 'desc' : 'asc',
                  })
                }}
              >
                {direction === 'asc' ? <IconSortAscending size={14} /> : <IconSortDescending size={14} />}
              </ActionIcon>
            </Tooltip>
          )}
          <TableUIFieldMenu field={field} />
        </Group>
      </Group>

      <Resizer
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        onMouseUp={() => onSetFieldWidth(header.id, header.getSize())}
      >
        <ResizerLine isResizing={column.getIsResizing()} />
      </Resizer>
    </th>
  )
})