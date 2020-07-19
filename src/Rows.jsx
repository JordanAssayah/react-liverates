import React from 'react';
import { Table as SemanticTable } from 'semantic-ui-react';
import Cells from './Cells';

const Row = ({ rows, prepareRow }) => rows.map((row, i) => {
  prepareRow(row)
  return (
    <SemanticTable.Row
      positive={row.values.bid > row.values.open}
      negative={row.values.bid < row.values.open}
      {...row.getRowProps()}>
      <Cells cells={row.cells} />
    </SemanticTable.Row>
  )
})


export default Row;