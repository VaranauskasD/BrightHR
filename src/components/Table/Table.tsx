import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/Ai'

import { DataFile } from '../types'

interface TableProps {
  data: DataFile[]
}

const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  padding: 8px;
  padding-top: 24px;
  width: 100%;
`

const StyledCaption = styled.caption`
  font-size: 24px;
  text-align: left;
`

const StyledTableHead = styled.thead`
  height: 100%;
  background: ${(props) => `${props.theme.colors.tertiary}`};
`

const StyledTableHeadRow = styled.tr`
  display: flex;
  justify-content: space-between;
`

const StyledTableBodyRow = styled.tr<{ $key: number }>`
  display: flex;
  justify-content: space-between;
  background: ${(props) =>
    props.$key % 2
      ? `${props.theme.colors.grey}`
      : `${props.theme.colors.secondary}`};
`

const StyledTableHeader = styled.th`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TableButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
`

const StyledTableBody = styled.tbody`
  height: 100%;
`

const StyledTableCell = styled.td`
  width: 100%;
  height: 32px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledArrowUpIcon = styled(AiOutlineArrowUp)`
  margin: 0 4px;
`

const StyledArrowDownIcon = styled(AiOutlineArrowDown)`
  margin: 0 4px;
`

export const Table = (props: TableProps) => {
  const [tableData, setTableData] = useState<DataFile[]>([])

  useEffect(() => {
    setTableData(props.data)
  }, [])

  const dataRow = (data: DataFile, key: number) => {
    return (
      <StyledTableBodyRow key={`${data.name}-${key}`} $key={key}>
        <StyledTableCell>
          {data.name ? data.name : 'Missing Name'}
        </StyledTableCell>
        <StyledTableCell>
          {data.added ? data.added : 'Missing Date'}
        </StyledTableCell>
        <StyledTableCell>
          {data.type ? data.type : 'Missing Type'}
        </StyledTableCell>
        <StyledTableCell>
          {data.files ? data.files.length : 'Missing size'}
        </StyledTableCell>
      </StyledTableBodyRow>
    )
  }

  return (
    <StyledTable aria-labelledby="caption">
      <StyledCaption id="caption">Files</StyledCaption>
      <StyledTableHead>
        <StyledTableHeadRow>
          <StyledTableHeader id="ColName">
            <TableButton
              type="button"
              id="ColNameSortButton"
              aria-label="Sort by name"
            >
              <span>Name</span>
              <StyledArrowUpIcon />
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader id="ColDate">
            <TableButton
              type="button"
              id="ColDateSortButton"
              aria-label="Sort by date"
            >
              <span>Date</span>
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader id="ColType">
            <TableButton
              type="button"
              id="ColTypeSortButton"
              aria-label="Sort by type"
            >
              <span>Type</span>
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader id="ColSize">
            <TableButton
              type="button"
              id="ColSizeSortButton"
              aria-label="Sort by size"
            >
              <span>Size</span>
            </TableButton>
          </StyledTableHeader>
        </StyledTableHeadRow>
      </StyledTableHead>
      <StyledTableBody>
        {tableData.map((file, key) => dataRow(file, key))}
      </StyledTableBody>
    </StyledTable>
  )
}

export default Table
