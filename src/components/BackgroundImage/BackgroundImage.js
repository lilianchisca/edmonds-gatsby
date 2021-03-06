import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'

const StyledBackgroundImage = styled.section`
  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }
`

export default function BackgroundImage({
  children,
  additionalClasses,
  image,
  cancelWidth,
  fallback,
}) {
  return (
    <StyledBackgroundImage
      className={`${additionalClasses} ${cancelWidth ? `` : `w-full`}`}
    >
      {fallback ? (
        <img
          src={image}
          className="absolute inset-0 object-cover object-center w-full h-full"
          alt="Background"
        />
      ) : (
        <Img
          fluid={image}
          class="w-full h-full absolute inset-0 object-cover object-center"
        />
      )}
      {children}
    </StyledBackgroundImage>
  )
}

BackgroundImage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  additionalClasses: PropTypes.string,
  image: PropTypes.object.isRequired,
  cancelWidth: PropTypes.bool,
  fallback: PropTypes.bool,
}
