import React from 'react'
import styled from 'styled-components'

import { Filter } from '../Filter'

interface MenuProps {}

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

const Navigation = styled.div`
  display: flex;
  flex: 1;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
`

const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledSubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`

const SubMenuButton = styled.button`
  display: flex;
  flex: 1;
  justify-content: space-between;
  background: none;
  border: none;
`

export const Menu = (props: MenuProps) => {
  // const SubMenu = () => {
  //   return (
  //     <StyledSubMenu>
  //       <SubMenuButton type="button" aria-label="Name">
  //         <span>Name</span>
  //         <StyledArrowUpIcon />
  //       </SubMenuButton>
  //       <SubMenuButton type="button" aria-label="Size">
  //         <span>Size</span>
  //       </SubMenuButton>
  //       <SubMenuButton type="button" aria-label="Date">
  //         <span>Date</span>
  //       </SubMenuButton>
  //     </StyledSubMenu>
  //   )
  // }

  return (
    <MenuWrapper>
      <StyledMenu>
        {/* <Navigation>
          <StyledButton type="button" aria-label="Back">
            Back
          </StyledButton>
        </Navigation> */}
        <FilterWrapper>
          <Filter />
        </FilterWrapper>
      </StyledMenu>
      {/* <SubMenu /> */}
    </MenuWrapper>
  )
}

export default Menu
