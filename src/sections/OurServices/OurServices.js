import React from 'react'
import { shape, arrayOf, string } from 'prop-types'

import BackgroundImage from '../../components/BackgroundImage'
import RellaxParallax from '../../components/RellaxParallax'
import UniversalLink from '../../components/UniversalLink'

const OurServices = ({
  sectionIndex,
  title,
  image,
  services,
  calloutTitle,
  calloutLink,
}) => (
  <section data-section-index={sectionIndex}>
    <div className="bg-white">
      <div className="mx-auto max-w-1460 px-30">
        <div className="relative pt-120 pb-120">
          <div className="absolute inset-0 flex">
            <div className="w-1/5 h-full border-l border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
          </div>

          <div className="relative">
            <div className="flex flex-wrap items-center -mx-25">
              <div className="w-1/2 px-25">
                <div className="max-w-550">
                  <div className="relative w-full overflow-hidden aspect-ratio-square rounded-5 shadow-box">
                    <RellaxParallax
                      center
                      speed="-0.5"
                      className="absolute inset-x-0 -top-16 -bottom-16"
                    >
                      <BackgroundImage
                        image={image.imageFile.childImageSharp.fluid}
                        additionalClasses="absolute inset-0"
                      />
                    </RellaxParallax>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-25">
                <h2 className="mt-20 mb-40 font-normal leading-tight text-26">
                  {title}
                </h2>
                <ul className="flex flex-wrap">
                  {services.map(({ service }) => (
                    <li className="w-1/2" key={service.title}>
                      <UniversalLink
                        className="mb-20 text-aqua-500 link-line-revicon text-16 tracking-body"
                        to={service.url}
                        target={service.target}
                      >
                        <span />
                        <span>{service.title}</span>
                      </UniversalLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <footer className="relative pt-120">
            <h3 className="mx-auto font-normal text-center max-w-670 text-27 leading-heading-xl">
              <span>{calloutTitle}&nbsp;</span>
              <UniversalLink
                to={calloutLink.url}
                className="text-aqua-500 link-line-icon link-line-icon--sm"
                target={calloutLink.target}
              >
                <span>{calloutLink.title}</span>
                <span />
              </UniversalLink>
            </h3>
          </footer>
        </div>
      </div>
    </div>
  </section>
)

OurServices.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  image: shape({
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
  services: arrayOf(
    shape({
      service: shape({
        url: string,
        title: string,
        target: string,
      }),
    })
  ).isRequired,
  calloutTitle: string,
  calloutLink: shape({
    url: string,
    title: string,
    target: string,
  }),
}

export default OurServices
