import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

import RellaxParallax from '../../components/RellaxParallax'
import BackgroundImage from '../../components/BackgroundImage'
import Button from '../../components/Button'

const StyledContent = styled.div`
  p {
    margin-bottom: 20px;

    &:first-child {
      color: #00254a;
      font-size: 19px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const FeaturedContent = ({
  sectionIndex,
  title,
  content,
  image1,
  image2,
  button1,
  button2,
}) => (
  <section data-section-index={sectionIndex} className="bg-aqua-200">
    <div className="mx-auto max-w-1460 px-30 pt-80 pb-130">
      <div className="flex flex-wrap -mx-45">
        <div className="w-1/2 px-45">
          <h2 className="pt-20 text-gray-300 uppercase mb-30 text-14 font-body tracking-button">
            {title}
          </h2>
          <StyledContent
            className="leading-loose text-gray-400 text-16 tracking-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {button1 || button2 ? (
            <footer className="text-reset pt-45">
              {button1 && (
                <Button
                  to={button1.url}
                  target={button1.target}
                  secondary
                  additionalClasses="mr-32 mb-6 md:mb-0"
                >
                  {button1.title}
                </Button>
              )}
              {button2 && (
                <Button
                  to={button2.url}
                  target={button2.target}
                  primary
                  additionalClasses="mr-32 mb-6 md:mb-0"
                >
                  {button2.title}
                </Button>
              )}
            </footer>
          ) : null}
        </div>
        <div className="w-1/2 px-45">
          <div className="ml-auto max-w-570">
            <Img
              className="overflow-hidden shadow-box rounded-5"
              fluid={image1.imageFile.childImageSharp.fluid}
            />
            <div className="max-w-310 -mt-70 ml-130">
              <RellaxParallax
                className="relative w-full overflow-hidden aspect-ratio-square rounded-5 shadow-box"
                speed="0.5"
                center
              >
                <BackgroundImage
                  image={image2.imageFile.childImageSharp.fluid}
                  additionalClasses="absolute inset-0 pointer-events-none"
                />
              </RellaxParallax>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

FeaturedContent.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  content: string.isRequired,
  image1: shape({
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
  image2: shape({
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

export default FeaturedContent
