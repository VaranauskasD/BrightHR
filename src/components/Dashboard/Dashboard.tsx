import React from 'react'
import styled from 'styled-components'

import { DataFile } from '../types'

import { Menu } from '../Menu'

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
  -moz-box-shadow: 3px 3px 0px 0px
    ${(props) => `${props.theme.colors.tertiary}`};
  -webkit-box-shadow: 3px 3px 0px 0px
    ${(props) => `${props.theme.colors.tertiary}`};
  box-shadow: 3px 3px 0px 0px ${(props) => `${props.theme.colors.tertiary}`};
  background: ${(props) => `${props.theme.colors.secondary}`};
`

const StyledContent = styled.div``

export const Dashboard = (props: DashboardProps) => {
  return (
    <StyledDashboard>
      <Menu>Test</Menu>
      <StyledContent>Test</StyledContent>
    </StyledDashboard>
  )
}

export default Dashboard
