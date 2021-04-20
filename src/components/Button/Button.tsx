import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Link } from 'react-router-dom';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  text?: string;
  to?: string;
  variant?: 'default' | 'secondary' | 'tertiary' | 'nobles' | 'peons' | 'exiled';
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext);

  let buttonColor: string;
  let textColor: string;
  let gradient: string;
  let boxShadow: string;
  let textShadow: string;
  switch (variant) {
    case 'nobles':
      gradient = 'linear-gradient(180deg, rgba(235,156,63,1) 50%, rgba(229,134,59,1) 51%)';
      boxShadow = '0px 0px 14px 2px rgba(0,0,0,0.75)';
      textShadow = '0 0 3px black';
      textColor = color.white;
      break;
    case 'peons':
      gradient = 'linear-gradient(180deg, rgba(92,162,215,1) 50%, rgba(67,118,183,1) 51%);';
      boxShadow = '0px 0px 14px 2px rgba(0,0,0,0.75)';
      textShadow = '0 0 3px black';
      textColor = color.white;
      break;
    case 'exiled':
      buttonColor = color.priceColors.tertiary;
      textColor = color.white;
      textShadow = '0 0 3px black';
      break;
    case 'secondary':
      buttonColor = color.teal[200];
      break;
    case 'default':
    default:
      buttonColor = color.primary.main;
      textColor = color.white;
  }

  let buttonSize: number;
  let buttonPadding: number;
  let fontSize: number;
  switch (size) {
    case 'xs': 
      buttonPadding = spacing[2];
      buttonSize = 32;
      fontSize = 14;
      break;
    case 'sm':
      buttonPadding = spacing[3];
      buttonSize = 36;
      fontSize = 14;
      break;
    case 'lg':
      buttonPadding = spacing[4];
      buttonSize = 72;
      fontSize = 16;
      break;
    case 'md':
    default:
      buttonPadding = spacing[4];
      buttonSize = 56;
      fontSize = 16;
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>;
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      );
    } else {
      return text;
    }
  }, [href, text, to]);

  return (
    <StyledButton
      boxShadow={boxShadow}
      textShadow={textShadow}
      color={buttonColor}
      textColor={textColor}
      gradient={gradient}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  );
};

interface StyledButtonProps {
  boxShadow: string;
  textShadow: string;
  color: string;
  textColor: string;
  gradient: string;
  disabled?: boolean;
  fontSize: number;
  padding: number;
  size: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${({ color }) => color};
  background: ${({ gradient }) => (!!gradient ? gradient : '')};
  border: 0;
  border-radius: 12px;
  box-shadow: ${(props) => props.boxShadow};
  color: ${({textColor}) => textColor};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  /* pointer-events: ${(props) => (!props.disabled ? undefined : 'none')}; */
  width: max-content;
  
  &:hover {
    opacity: 0.8;
  }

  ${({ disabled }) =>
    disabled
      ? `
          cursor: not-allowed;
         opacity: 0.7;
        `
      : ''}
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default Button;
