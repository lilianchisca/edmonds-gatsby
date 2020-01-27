import React, { useEffect, useState } from 'react'
import { string, shape } from 'prop-types'
import styled from 'styled-components'

import RellaxParallax from '../../components/RellaxParallax'
import BackgroundImage from '../../components/BackgroundImage'

const Lines = styled.div`
  pointer-events: none;
  position: relative;

  img {
    position: absolute;
    width: 1388px;
    height: 690px;
    top: -280px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Line = styled(RellaxParallax)`
  bottom: 29px;
  position: absolute;
  left: 0;
  right: 0;
  overflow-x: hidden;
  pointer-events: none;

  img {
    width: calc(100% + 60px);
    max-width: calc(100% + 60px);
    margin-left: -30px;
    margin-right: -30px;
    transition: all 1.2s;
    transition-delay: 0.3s;

    &.yellowline {
      transform: translate(-500px, 300px);
    }

    &.blueline {
      transform: translate(500px, 300px);
    }

    &.is-active {
      transform: none;
    }
  }
`

const StyledHeading = styled.h1`
  span {
    display: block;
  }

  > span {
    overflow: hidden;

    span {
      transform: translateY(100%);
      transition: all 0.7s;
      transition-delay: 0.3s;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #6784c9;
    height: 2px;
    transform: translateX(-50%);
    left: 50%;
    transition: all 1s;
    transition-delay: 0.5s;
    max-width: 0;
  }

  &::before {
    bottom: -30px;
    width: 52px;
  }

  &::after {
    bottom: -40px;
    width: 26px;
  }

  &.is-active {
    &::before,
    &::after {
      max-width: 52px;
    }

    > span {
      span {
        transform: none;
      }
    }
  }
`

const PageIntro = ({ sectionIndex, title, backgroundImage }) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <section
      data-section-index={sectionIndex}
      className="overflow-hidden bg-blue-600 border-yellow-500 border-b-5"
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden ${
          backgroundImage ? `min-h-660` : `min-h-330`
        }`}
      >
        {backgroundImage && (
          <>
            <RellaxParallax className="absolute inset-x-0 -top-16 -bottom-16">
              <BackgroundImage
                image={backgroundImage.imageFile.childImageSharp.fluid}
                additionalClasses="absolute inset-0 pointer-events-none"
              />
            </RellaxParallax>
            <Line speed="0.5">
              <img
                src="/images/yellowline.png"
                alt="decorative lines"
                className={`yellowline ${inView ? `is-active` : ``}`}
              />
            </Line>
            <Line speed="-0.5">
              <img
                src="/images/blueline.png"
                alt="decorative lines"
                className={`blueline ${inView ? `is-active` : ``}`}
              />
            </Line>
          </>
        )}
        <div
          className={`relative w-full mx-auto text-center text-white max-w-1020 px-30 ${
            backgroundImage ? `pt-30` : `pt-55`
          }`}
        >
          <StyledHeading
            className={`relative font-normal text-white text-24 sm:text-27 md:text-34 lg:text-40 leading-heading ${
              inView ? `is-active` : ``
            }`}
          >
            <span>
              <span>{title}</span>
            </span>
          </StyledHeading>
        </div>
      </div>
      {backgroundImage && (
        <Lines>
          <img src="/images/lines.png" alt="delimiter" />
        </Lines>
      )}
    </section>
  )
}

PageIntro.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  backgroundImage: shape({
    imageFile: shape({
      childImageSharp: shape({
        fluid: shape({
          base64: string,
          src: string,
          srcSet: string,
          srcWebp: string,
          srcSetWebp: string,
          sizes: string,
        }),
      }),
    }),
  }),
}

export default PageIntro
