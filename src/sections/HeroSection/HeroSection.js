import React, { useEffect, useState, useRef } from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import RellaxParallax from '../../components/RellaxParallax'
import BackgroundImage from '../../components/BackgroundImage'
import Button from '../../components/Button'

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
    top: -50px;
    width: 52px;
  }

  &::after {
    top: -60px;
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

const HeroButtons = styled.footer`
  > span {
    display: inline-block;
    overflow: hidden;

    span {
      display: inline-block;
      transform: translateY(100%);
      transition: all 0.5s;
      transition-delay: 0.45s;
    }

    &:nth-child(2) {
      span {
        transition-delay: 0.6s;
      }
    }
  }

  &.is-active {
    > span {
      span {
        transform: none;
      }
    }
  }
`

const HeroSection = ({
  sectionIndex,
  title,
  backgroundImage,
  button1,
  button2,
}) => {
  const [inView, setInView] = useState(false)
  const nextRef = useRef(null)

  useEffect(() => {
    setInView(true)
  }, [])

  const handleNext = () => {
    nextRef.current.scrollIntoView({
      behavior: `smooth`,
    })
  }

  return (
    <section data-section-index={sectionIndex}>
      <div className="relative flex items-center justify-center overflow-hidden min-h-660 sm:min-h-760">
        <RellaxParallax className="absolute inset-x-0 -top-16 -bottom-16">
          <BackgroundImage
            image={backgroundImage.imageFile.childImageSharp.fluid}
            additionalClasses="absolute inset-0 pointer-events-none"
          />
        </RellaxParallax>
        <Line speed="0.5">
          <img
            className={`yellowline ${inView ? `is-active` : ``}`}
            src="/images/yellowline.png"
            alt="decorative lines"
          />
        </Line>
        <Line speed="-0.5">
          <img
            className={`blueline ${inView ? `is-active` : ``}`}
            src="/images/blueline.png"
            alt="decorative lines"
          />
        </Line>
        <div className="relative w-full mx-auto text-center text-white max-w-1020 px-30 pt-90">
          <StyledHeading
            className={`relative font-normal text-white text-24 sm:text-27 md:text-34 lg:text-40 leading-heading ${
              inView ? `is-active` : ``
            }`}
          >
            <span>
              <span>{title}</span>
            </span>
          </StyledHeading>
          {button1 || button2 ? (
            <HeroButtons className={`pt-45 ${inView ? `is-active` : ``}`}>
              {button1 && (
                <span>
                  <span>
                    <Button
                      primary
                      additionalClasses="mx-17 mb-6 md:mb-0"
                      handler={handleNext}
                    >
                      {button1.title}
                    </Button>
                  </span>
                </span>
              )}
              {button2 && (
                <span>
                  <span>
                    <Button
                      to={button2.url}
                      target={button2.target}
                      secondary
                      additionalClasses="mx-17 mb-6 md:mb-0"
                    >
                      {button2.title}
                    </Button>
                  </span>
                </span>
              )}
            </HeroButtons>
          ) : null}
        </div>
      </div>
      <div ref={nextRef} />
      <Lines>
        <img src="/images/lines.png" alt="delimiter" />
      </Lines>
    </section>
  )
}

HeroSection.propTypes = {
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
  }).isRequired,
  button1: shape({
    url: string,
    title: string,
    target: string,
  }),
  button2: shape({
    url: string,
    title: string,
    target: string,
  }),
}

export default HeroSection
