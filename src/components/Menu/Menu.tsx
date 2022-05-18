import React, { ReactNode, ChangeEvent } from 'react'
import styled from 'styled-components'

import { BsFillArrowLeftCircleFill } from 'react-icons/Bs'

import { Filter } from '../Filter'

export interface MenuProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
  padding: 8px;
  height: 48px;
  background: ${(props) => `${props.theme.colors.primary}`};
`

const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

const Navigation = styled.div`
  display: flex;
  flex: 1;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  :focus-within,
  :hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
`

const StyledArrowIcon = styled(BsFillArrowLeftCircleFill)`
  min-height: 24px;
  min-width: 24px;
  color: ${(props) => `${props.theme.colors.secondary}`};
`

export const Menu = (props: MenuProps) => {
  return (
    <MenuWrapper>
      <StyledMenu>
        <StyledButton type="button" aria-label="Back">
          <StyledArrowIcon />
        </StyledButton>
        <FilterWrapper>
          <Filter handleChange={props.handleChange} />
        </FilterWrapper>
      </StyledMenu>
    </MenuWrapper>
  )
}

export default Menu
