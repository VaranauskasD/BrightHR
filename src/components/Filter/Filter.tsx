import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import { FiFilter } from 'react-icons/Fi'

export interface FilterProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => `${props.theme.colors.secondary}`};
  border-radius: 24px;

  :focus-within {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
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
  min-width: 240px;
  height: 100%;
  margin-left: 4px;
  padding-left: 4px;
  background: ${(props) => `${props.theme.colors.secondary}`};
  outline: none;
  border-left: 1px solid ${(props) => `${props.theme.colors.grey}`};

  @media (min-width: ${(props) => `${props.theme.breakpoints.md}px`}) {
    min-width: 330px;
  }
`

export const Filter = (props: FilterProps) => {
  return (
    <FilterWrapper>
      <StyledLabel>Filter files</StyledLabel>
      <StyledFilterIcon aria-hidden="true" />
      <StyledInput
        type="text"
        placeholder="Filter"
        onChange={(event) => props.handleChange(event)}
        data-testid="filter"
      ></StyledInput>
    </FilterWrapper>
  )
}

export default Filter
