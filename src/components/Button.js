import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
  color: black;
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: ease .2s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: ease .2s;
  }
`

export const Button = ({ children, ...props }) => {
  return(
    <ButtonContainer {...props}>
      {children}
    </ButtonContainer>
  )
}