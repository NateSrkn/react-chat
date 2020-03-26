import React from 'react'
import styled from 'styled-components'

const TextContainer = styled.input`
  padding: 10px 5px 10px 10px;
  font-size: 14px;
  display: flex;
  width: 100%;
  border: none;
  margin-bottom: 10px;
  box-shadow:
  0 4.3px 9.3px rgba(0, 0, 0, 0.059),
  0 12.8px 26.7px rgba(0, 0, 0, 0.085),
  0 30.2px 64.5px rgba(0, 0, 0, 0.111),
  0 82px 200px rgba(0, 0, 0, 0.17)
;
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