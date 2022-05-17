import React from 'react'
import styled from 'styled-components'

import { FiFilter } from 'react-icons/Fi'

interface FilterProps {}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => `${props.theme.colors.secondary}`};
  border-radius: 24px;

  :focus-within {
    outline: 3px solid black;
  }
`

const StyledLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
`

const StyledFilterIcon = styled(FiFilter)`
  margin: 0 4px 0 8px;
`

const StyledInput = styled.input`
  border-radius: 0 24px 24px 0;
  border: none;
  min-width: 330px;
  height: 100%;
  margin-left: 4px;
  padding-left: 4px;
  background: ${(props) => `${props.theme.colors.secondary}`};
  outline: none;
  border-left: 1px solid ${(props) => `${props.theme.colors.grey}`};
`

export const Filter = (props: FilterProps) => {
  return (
    <SearchWrapper>
      <StyledLabel>Filter files</StyledLabel>
      <StyledFilterIcon />
      <StyledInput type="text" placeholder="Filter"></StyledInput>
    </SearchWrapper>
  )
}

export default Filter
