import React, { useState, ChangeEvent, createRef } from 'react'
import styled from 'styled-components'

import { DataFile } from '../types'

import { Menu } from '../Menu'
import { Table } from '../Table'

export interface DashboardProps {
  data: DataFile[]
}

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 16px;
  width: 900px;
  height: 660px;
  min-width: 320px;
  min-height: 660px;
  border-radius: 20px;
  -moz-box-shadow: 3px 3px 0px 0px ${(props) => `${props.theme.colors.grey}`};
  -webkit-box-shadow: 3px 3px 0px 0px ${(props) => `${props.theme.colors.grey}`};
  box-shadow: 3px 3px 0px 0px ${(props) => `${props.theme.colors.grey}`};
  background: ${(props) => `${props.theme.colors.secondary}`};
`

const StyledContent = styled.div`
  overflow-y: scroll;
  margin: 16px;
`

export const Dashboard = (props: DashboardProps) => {
  const [filter, setFilter] = useState<string | undefined>()

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLocaleLowerCase())
  }

  return (
    <StyledDashboard>
      <Menu handleChange={handleFilterChange} />
      <StyledContent>
        <Table data={props.data} filter={filter} />
      </StyledContent>
    </StyledDashboard>
  )
}

export default Dashboard
