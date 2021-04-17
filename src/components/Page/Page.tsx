import React from 'react'
import styled from 'styled-components'
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints'
import Footer from '../Footer'
import TopBar from '../TopBar'
import MobileMenu from '../MobileMenu'

const Page: React.FC = ({ children }) => {
  const {isXs,isSm,isMd} = useMatchBreakpoints()

  return (
  <StyledPage>
    { isXs || isSm || isMd ? <MobileMenu /> : <TopBar />}
    <StyledMain>
      {children}
    </StyledMain>
    <Footer />
  </StyledPage>
)}

const StyledPage = styled.div`
  background: url('/realmBG.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${props => props.theme.topBarSize * 2}px);
`

export default Page