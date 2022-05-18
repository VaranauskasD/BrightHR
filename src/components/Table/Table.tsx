import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiFillFile,
  AiFillFolder,
} from 'react-icons/Ai'

import { DataFile } from '../types'
import { type } from 'os'

export interface TableProps {
  data: DataFile[]
  filter?: string
}

const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  padding: 8px;
  padding-top: 24px;
  width: 100%;
  overflow: auto;
  border-collapse: collapse;
`

const StyledCaption = styled.caption`
  font-size: 24px;
  text-align: left;
`

const StyledTableHead = styled.thead`
  height: 100%;
  margin: 4px 0;
`

const StyledTableHeadRow = styled.tr`
  display: table-row;
  background: ${(props) => `${props.theme.colors.tertiary}`};
`

const StyledTableBodyRow = styled.tr<{ $key: number }>`
  display: table-row;
  justify-content: space-between;
  background: ${(props) =>
    props.$key % 2
      ? `${props.theme.colors.grey}`
      : `${props.theme.colors.secondary}`};
`

const StyledTableHeader = styled.th`
  width: 100%;
  min-width: 100px;
  min-height: 32px;
  display: table-cell;
  align-items: center;

  :focus-within {
    box-shadow: 0 0 4px black;
  }

  :hover {
    background: ${(props) => `${props.theme.colors.primary}`};
    box-shadow: 0 0 4px black;
  }
`

const TableHeaderButton = styled.button`
  width: 100%;
  display: flex;
  padding: 8px;
  margin: 0px;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`

const StyledTableBody = styled.tbody`
  height: 100%;
`

const StyledTableCell = styled.td`
  width: 100%;
  min-width: 100px;
  min-height: 32px;
  padding: 8px;
  display: table-cell;
  align-items: center;
`

const TableButton = styled.button`
  padding: 0;
  margin: 0px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: underline;
`

const StyledFileIcon = styled(AiFillFile)`
  margin: 0 4px;
  min-width: 16px;
  min-height: 16px;
`

const StyledFolderIcon = styled(AiFillFolder)`
  margin: 0 4px;
  min-width: 16px;
  min-height: 16px;
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
  const [nameDescending, setNameDescending] = useState<boolean>(true)
  const [typeDescending, setTypeDescending] = useState<boolean>(true)
  const [dateDescending, setDateDescending] = useState<boolean>(true)
  const [sizeDescending, setSizeDescending] = useState<boolean>(true)

  useEffect(() => {
    sortByName(props.data, true)
    setTableData(props.data)
  }, [])

  useEffect(() => {
    const filteredData = props.data.filter((file) =>
      file.name.toLocaleLowerCase().includes(props.filter || '')
    )

    sortByName(filteredData, true)
    setTableData(filteredData)
  }, [props.filter])

  const sortByName = (data: DataFile[], descending: boolean) => {
    const sortData = data

    descending
      ? sortData.sort((file_one, file_two) =>
          file_one.name.localeCompare(file_two.name)
        )
      : sortData.sort((file_one, file_two) =>
          file_two.name.localeCompare(file_one.name)
        )

    setTableData(sortData)
    setNameDescending(!nameDescending)

    const keys = Array(4).fill(0)
    keys[0] = 1
    setSortKeys(keys)
  }

  const sortByType = (data: DataFile[], descending: boolean) => {
    const sortData = data

    descending
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
    setTypeDescending(!typeDescending)

    const keys = Array(4).fill(0)
    keys[1] = 1
    setSortKeys(keys)
  }

  const sortByDate = (data: DataFile[], descending: boolean) => {
    const sortData = data

    descending
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
    setDateDescending(!dateDescending)

    const keys = Array(4).fill(0)
    keys[2] = 1
    setSortKeys(keys)
  }

  const sortBySize = (data: DataFile[], descending: boolean) => {
    const sortData = data

    descending
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
    setSizeDescending(!sizeDescending)

    const keys = Array(4).fill(0)
    keys[3] = 1
    setSortKeys(keys)
  }

  const dataRow = (data: DataFile, key: number) => {
    return (
      <StyledTableBodyRow
        key={`${data.name}-${key}`}
        $key={key}
        data-testid={`${data.name}-${key}`}
      >
        <StyledTableCell data-testid={`cell-${data.name}-${key}`}>
          {data.type === 'folder' ? (
            <TableButton>
              <StyledFolderIcon />
              <span>{data.name ? data.name : 'Missing Name'}</span>
            </TableButton>
          ) : (
            <React.Fragment>
              <StyledFileIcon />
              <span>{data.name ? data.name : 'Missing Name'}</span>
            </React.Fragment>
          )}
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
                ? nameDescending
                  ? 'descending'
                  : 'ascending'
                : 'none'
            }
          >
            <TableHeaderButton
              type="button"
              id="ColNameSortButton"
              data-testid="ColNameSortButton"
              aria-label="Sort by name"
              onClick={() => sortByName(tableData, nameDescending)}
            >
              <span>Name</span>
              {sortKeys[0] ? (
                nameDescending ? (
                  <StyledArrowDownIcon aria-hidden="true" />
                ) : (
                  <StyledArrowUpIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableHeaderButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColType"
            aria-sort={
              sortKeys[1]
                ? typeDescending
                  ? 'descending'
                  : 'ascending'
                : 'none'
            }
          >
            <TableHeaderButton
              type="button"
              id="ColTypeSortButton"
              data-testid="ColTypeSortButton"
              aria-label="Sort by type"
              onClick={() => sortByType(tableData, typeDescending)}
            >
              <span>Type</span>
              {sortKeys[1] ? (
                typeDescending ? (
                  <StyledArrowDownIcon aria-hidden="true" />
                ) : (
                  <StyledArrowUpIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableHeaderButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColDate"
            aria-sort={
              sortKeys[2]
                ? dateDescending
                  ? 'descending'
                  : 'ascending'
                : 'none'
            }
          >
            <TableHeaderButton
              type="button"
              id="ColDateSortButton"
              data-testid="ColDateSortButton"
              aria-label="Sort by date"
              onClick={() => sortByDate(tableData, dateDescending)}
            >
              <span>Date</span>
              {sortKeys[2] ? (
                dateDescending ? (
                  <StyledArrowDownIcon aria-hidden="true" />
                ) : (
                  <StyledArrowUpIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableHeaderButton>
          </StyledTableHeader>
          <StyledTableHeader
            id="ColSize"
            aria-sort={
              sortKeys[3]
                ? sizeDescending
                  ? 'descending'
                  : 'ascending'
                : 'none'
            }
          >
            <TableHeaderButton
              type="button"
              id="ColSizeSortButton"
              data-testid="ColSizeSortButton"
              aria-label="Sort by size"
              onClick={() => sortBySize(tableData, sizeDescending)}
            >
              <span>Size</span>
              {sortKeys[3] ? (
                sizeDescending ? (
                  <StyledArrowDownIcon aria-hidden="true" />
                ) : (
                  <StyledArrowUpIcon aria-hidden="true" />
                )
              ) : (
                <React.Fragment />
              )}
            </TableHeaderButton>
          </StyledTableHeader>
        </StyledTableHeadRow>
      </StyledTableHead>
      <StyledTableBody data-testid="tablebody">
        {tableData.map((file, key) => dataRow(file, key))}
      </StyledTableBody>
    </StyledTable>
  )
}

export default Table
