import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

import AccountButton from '../TopBar/components/AccountButton'

const MobileMenu: React.FC = () => {
  const theme = useContext(ThemeContext)

  const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: theme.color.primary.main
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: theme.color.white,
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <Menu styles={styles}>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">Farms</StyledLink>
      <StyledLink exact activeClassName="active" to="/courtroom">Court Room</StyledLink>
      <StyledLink exact activeClassName="active" to="/exile">Exile</StyledLink>
      <StyledLink exact activeClassName="active" to="/royal-guard">Royal Guard</StyledLink>
      <StyledLink exact activeClassName="active" to="/adventures">Realm Adventures</StyledLink>
      <StyledLink exact activeClassName="active" to="/archives">Archives</StyledLink>
      {/* TODO: Change to real voting page */}
      <StyledLink2 href="https://snapshot.page/#/basiscash.eth" target="_blank" >Vote</StyledLink2>
      <AccountButton />
      </Menu>
  )
}

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`
const StyledLink2 = styled.a`
  color: ${props => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`

export default MobileMenu