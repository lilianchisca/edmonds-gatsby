import React from 'react'
import { shape, arrayOf, string, number } from 'prop-types'
import styled from 'styled-components'

import RellaxParallax from '../../components/RellaxParallax'
import BackgroundImage from '../../components/BackgroundImage'

// const BlueLine = styled.div`
//   width: 1336px;
//   height: 304px;
//   background: url('/images/bluelinehalf.png') no-repeat center / 100% 100%;
//   position: absolute;
//   top: 28%;
//   right: 60%;
// `

// const YellowLine = styled.div`
//   width: 1739px;
//   height: 156px;
//   background: url('/images/yellowlinehalf.png') no-repeat center / 100% 100%;
//   position: absolute;
//   top: 50%;
//   right: 60%;
// `

const FeaturedBlocks = ({
  sectionIndex,
  pretitle,
  title,
  image1,
  image2,
  blocks,
}) => (
  <section data-section-index={sectionIndex} className="relative bg-white">
    <div className="absolute inset-0">
      <div className="h-full mx-auto max-w-1460 px-30">
        <div className="relative h-full">
          <div className="absolute inset-0 flex">
            <div className="w-1/5 h-full border-l border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
          </div>
        </div>
      </div>
    </div>
    {/* <YellowLine />
    <BlueLine /> */}
    <div className="mx-auto max-w-1460 px-30">
      <div className="relative pt-80 pb-70">
        <div className="relative flex flex-wrap -mx-29">
          <div className="w-1/2 px-25">
            <div className="max-w-480">
              <div className="relative w-full overflow-hidden aspect-ratio-square rounded-5 shadow-box">
                <div className="absolute inset-x-0 -top-16 -bottom-16">
                  <BackgroundImage
                    image={image1.imageFile.childImageSharp.fluid}
                    additionalClasses="absolute inset-0 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="ml-auto max-w-310 -mt-70 mr-110">
              <RellaxParallax
                className="relative w-full overflow-hidden aspect-ratio-square rounded-5 shadow-box"
                speed="-0.5"
                center
              >
                <BackgroundImage
                  image={image2.imageFile.childImageSharp.fluid}
                  additionalClasses="absolute inset-0 pointer-events-none"
                />
              </RellaxParallax>
            </div>
          </div>
          <div className="w-1/2 px-25">
            <h3 className="pt-20 mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
              {pretitle}
            </h3>
            <h2 className="font-normal text-22 leading-heading-md mb-45">
              {title}
            </h2>
            <ul className="flex flex-wrap -mx-25">
              {blocks.map(block => (
                <li className="w-1/2 px-25 mb-45" key={block.title}>
                  <div className="h-full pb-40 overflow-hidden text-center bg-white border border-transparent shadow-box transition-all duration-300 hover:shadow-none px-30 rounded-5 hover:border-gray-200">
                    <header className="flex items-center justify-center h-110">
                      <img
                        src={block.icon.imageFile.childImageSharp.fluid.src}
                        alt={block.icon.altText}
                        width={block.icon.mediaDetails.width / 2}
                        height={block.icon.mediaDetails.height / 2}
                      />
                    </header>
                    <h2 className="mb-10 font-bold font-body text-18 leading-heading tracking-heading-md">
                      {block.title}
                    </h2>
                    <div
                      className="text-gray-400 text-16 leading-body tracking-body"
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
)

FeaturedBlocks.propTypes = {
  sectionIndex: string,
  pretitle: string.isRequired,
  title: string.isRequired,
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
  }).isRequired,
  blocks: arrayOf(
    shape({
      title: string.isRequired,
      description: string.isRequired,
      icon: shape({
        mediaDetails: shape({
          width: number,
          height: number,
        }),
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
    })
  ),
}

export default FeaturedBlocks
