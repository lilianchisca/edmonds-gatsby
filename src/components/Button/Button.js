import React from 'react'
import { bool, string, oneOfType, arrayOf, node } from 'prop-types'
import styled from 'styled-components'

import UniversalLink from '../UniversalLink'

const StyledButton = styled(UniversalLink)`
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props =>
      props.primary ? `#8d6b15` : props.secondary ? `#3e5079` : `#3e5079`};
    height: 6px;
    transform: translateY(6px);
    transition: all 0.3s;
  }

  &:hover {
    &::before {
      transform: none;
    }
  }
`

const Button = ({
  primary,
  secondary,
  ghost,
  to,
  target,
  children,
  additionalClasses,
}) => (
  <StyledButton
    to={to}
    target={target}
    primary={primary}
    secondary={secondary}
    ghost={ghost}
    className={`min-w-166 md:min-w-196 overflow-hidden text-center px-20 xl:px-45 relative rounded-5 inline-block text-14 tracking-wider md:tracking-button uppercase ${
      primary
        ? `leading-button-sm md:leading-button bg-yellow-500 text-blue-500`
        : ``
    } ${
      secondary
        ? `leading-button-sm md:leading-button bg-aqua-500 text-white`
        : ``
    } ${
      ghost
        ? `border-2 border-aqua-500 hover:border-aqua-600 leading-button-border-sm md:leading-button-border`
        : ``
    } ${additionalClasses}`}
  >
    {children}
  </StyledButton>
)

Button.propTypes = {
  to: string,
  target: string,
  additionalClasses: string,
  primary: bool,
  secondary: bool,
  ghost: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
}

export default Button
