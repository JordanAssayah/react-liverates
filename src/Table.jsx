import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { Table as SemanticTable, Message } from 'semantic-ui-react';
import Rows from './Rows';

export default function Table({ data }) {

  const columns = useMemo(() => [
    { Header: 'Currency', accessor: 'currency' },
    { Header: 'Bid', accessor: 'bid' },
    { Header: 'Ask', accessor: 'ask' },
    { Header: 'High', accessor: 'high' },
    { Header: 'Low', accessor: 'low' },
    { Header: 'Open', accessor: 'open' },
    { Header: 'Close', accessor: 'close' },
    { Header: 'Time', accessor: 'timestamp' },
  ], [])

  const memoizedData = useMemo(() => data, [data])
    
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: memoizedData,
  })

  // We handle API error (3 request per hour)
  if (data[0] !== undefined && data[0].error) {
    return (
      <Message negative>
        <Message.Header>Oh No!</Message.Header>
        <p>{ data[0].error }</p>
      </Message>
    )
  }

  return (
    <SemanticTable {...getTableProps()}>
      <SemanticTable.Header>
        {headerGroups.map(headerGroup => (
          <SemanticTable.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <SemanticTable.HeaderCell {...column.getHeaderProps()}>
                { column.render('Header') }
              </SemanticTable.HeaderCell>
            ))}
          </SemanticTable.Row>
        ))}
      </SemanticTable.Header>

      {data.length < 1
        ? null
        : (
        <SemanticTable.Body {...getTableBodyProps()}>
          <Rows rows={rows} prepareRow={prepareRow} />
        </SemanticTable.Body>
      )}
    </SemanticTable>
  )

};