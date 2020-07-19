import React from 'react';
import { Table as SemanticTable } from 'semantic-ui-react';
import format from 'date-fns/format';


const Cells = ({ cells }) => cells.map(cell => {
  // Date instance only allow to use timestamp values as an integer and not a string so we cast the value
  // Then we format the date so it can be human readable
  if (cell.column.id === 'timestamp') {
    return (
      <SemanticTable.Cell {...cell.getCellProps()}>
        { format(new Date(Number(cell.value)), 'dd/MM/yyyy @ HH:mm:ss') }
      </SemanticTable.Cell>
    )}
  return (
    <SemanticTable.Cell {...cell.getCellProps()}>
      { cell.render('Cell') }
    </SemanticTable.Cell>
  )
})

export default Cells;