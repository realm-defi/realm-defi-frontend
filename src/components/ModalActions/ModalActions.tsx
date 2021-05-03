import React from 'react'
import styled from 'styled-components'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>
            {child}
          </StyledModalAction>
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.theme.color.grey[100]}00;
  display: flex;
  height: 96px;
  margin: ${props => props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
`

const StyledModalAction = styled.div`
`

export default ModalActions