import React from 'react'
import styled from 'styled-components'

const TextContainer = styled.input`
  padding: 10px 5px 10px 10px;
  font-size: 14px;
  display: flex;
  width: 100%;
  border: none;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`

export const TextInput = ({hasButton, ...props}) => {
  switch(hasButton) {
    case true:
      return <TextContainer type="text" {...props} />
    default:
      return <TextContainer type="text" {...props} />
  }
}