import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/Ai'

import { DataFile } from '../types'
import { type } from 'os'

export interface TableProps {
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
  margin: 4px 0;
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
  min-height: 32px;
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
  cursor: pointer;
`

const StyledTableBody = styled.tbody`
  height: 100%;
`

const StyledTableCell = styled.td`
  width: 100%;
  min-height: 32px;
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
  const [sortKeys, setSortKeys] = useState<number[]>([1, 0, 0, 0])
  const [nameAscending, setNameAscending] = useState<boolean>(true)
  const [typeAscending, setTypeAscending] = useState<boolean>(true)
  const [dateAscending, setDateAscending] = useState<boolean>(true)
  const [sizeAscending, setSizeAscending] = useState<boolean>(true)

  useEffect(() => {
    sortByName(props.data, true)
    setTableData(props.data)
  }, [])

  const sortByName = (data: DataFile[], ascending: boolean) => {
    const sortData = data

    ascending
      ? sortData.sort((file_one, file_two) =>
          file_one.name.localeCompare(file_two.name)
        )
      : sortData.sort((file_one, file_two) =>
          file_two.name.localeCompare(file_one.name)
        )

    setTableData(sortData)
    setNameAscending(!nameAscending)

    const keys = Array(4).fill(0)
    keys[0] = 1
    setSortKeys(keys)
  }

  const sortByType = (data: DataFile[], ascending: boolean) => {
    const sortData = data

    ascending
      ? sortData.sort((file_one, file_two) => {
          if (file_one.type === 'folder' && file_two.type !== 'folder')
            return -1
          if (file_two.type === 'folder' && file_one.type !== 'folder') return 1
          return file_one.type.localeCompare(file_two.type)
        })
      : sortData.sort((file_one, file_two) => {
          if (file_one.type === 'folder' && file_two.type !== 'folder') return 1
          if (file_two.type === 'folder' && file_one.type !== 'folder')
            return -1
          return file_two.type.localeCompare(file_one.type)
        })

    setTableData(data)
    setTypeAscending(!typeAscending)

    const keys = Array(4).fill(0)
    keys[1] = 1
    setSortKeys(keys)
  }

  const sortByDate = (data: DataFile[], ascending: boolean) => {
    const sortData = data

    ascending
      ? sortData.sort((file_one, file_two) => {
          if (!file_one.added) return 1
          if (!file_two.added) return -1
          return file_one.added.localeCompare(file_two.added)
        })
      : sortData.sort((file_one, file_two) => {
          if (!file_one.added) return 1
          if (!file_two.added) return -1
          return file_two.added.localeCompare(file_one.added)
        })

    setTableData(data)
    setDateAscending(!dateAscending)

    const keys = Array(4).fill(0)
    keys[2] = 1
    setSortKeys(keys)
  }

  const sortBySize = (data: DataFile[], ascending: boolean) => {
    const sortData = data

    ascending
      ? sortData.sort((file_one, file_two) => {
          if (!file_one.files) return 1
          if (!file_two.files) return -1
          return file_one.files.length - file_two.files.length
        })
      : sortData.sort((file_one, file_two) => {
          if (!file_one.files) return 1
          if (!file_two.files) return -1
          return file_two.files.length - file_one.files.length
        })

    setTableData(data)
    setSizeAscending(!sizeAscending)

    const keys = Array(4).fill(0)
    keys[3] = 1
    setSortKeys(keys)
  }

  const dataRow = (data: DataFile, key: number) => {
    return (
      <StyledTableBodyRow key={`${data.name}-${key}`} $key={key}>
        <StyledTableCell>
          {data.name ? data.name : 'Missing Name'}
        </StyledTableCell>
        <StyledTableCell>
          {data.type ? data.type : 'Missing Type'}
        </StyledTableCell>
        <StyledTableCell>
          {data.added ? data.added : 'Missing Date'}
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
          <StyledTableHeader
            id="ColName"
            aria-sort={
              sortKeys[0]
                ? nameAscending
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <TableButton
              type="button"
              id="ColNameSortButton"
              aria-label="Sort by name"
              onClick={() => sortByName(tableData, nameAscending)}
            >
              <span>Name</span>
              {sortKeys[0] ? (
                nameAscending ? (
                  <StyledArrowUpIcon aria-hidden="true" />
                ) : (
                  <StyledArrowDownIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColType"
            aria-sort={
              sortKeys[1]
                ? typeAscending
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <TableButton
              type="button"
              id="ColTypeSortButton"
              aria-label="Sort by type"
              onClick={() => sortByType(tableData, typeAscending)}
            >
              <span>Type</span>
              {sortKeys[1] ? (
                typeAscending ? (
                  <StyledArrowUpIcon aria-hidden="true" />
                ) : (
                  <StyledArrowDownIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColDate"
            aria-sort={
              sortKeys[2]
                ? dateAscending
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <TableButton
              type="button"
              id="ColDateSortButton"
              aria-label="Sort by date"
              onClick={() => sortByDate(tableData, dateAscending)}
            >
              <span>Date</span>
              {sortKeys[2] ? (
                dateAscending ? (
                  <StyledArrowUpIcon aria-hidden="true" />
                ) : (
                  <StyledArrowDownIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColSize"
            aria-sort={
              sortKeys[3]
                ? sizeAscending
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <TableButton
              type="button"
              id="ColSizeSortButton"
              aria-label="Sort by size"
              onClick={() => sortBySize(tableData, sizeAscending)}
            >
              <span>Size</span>
              {sortKeys[3] ? (
                sizeAscending ? (
                  <StyledArrowUpIcon aria-hidden="true" />
                ) : (
                  <StyledArrowDownIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
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
