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
  box-shadow:
  0 4.3px 9.3px rgba(0, 0, 0, 0.059),
  0 12.8px 26.7px rgba(0, 0, 0, 0.085),
  0 30.2px 64.5px rgba(0, 0, 0, 0.111),
  0 82px 200px rgba(0, 0, 0, 0.17);
  transition: ease .2s;

  &:hover {
    box-shadow:
      0 4.3px 9.3px rgba(0, 0, 0, 0.059),
      0 12.8px 26.7px rgba(0, 0, 0, 0.085);
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