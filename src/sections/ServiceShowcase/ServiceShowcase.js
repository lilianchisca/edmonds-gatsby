import React from 'react'
import { arrayOf, shape, string, number } from 'prop-types'

import Button from '../../components/Button'

const ServiceShowcase = ({
  sectionIndex,
  title,
  content,
  services,
  button1,
  button2,
}) => (
  <section data-section-index={sectionIndex}>
    <div className="bg-aqua-200">
      <div className="mx-auto text-center max-w-1460 px-30 pt-80 pb-110">
        <h2 className="font-normal leading-tight mb-30 text-32">{title}</h2>
        <div
          className="mx-auto leading-loose text-gray-400 max-w-1150 text-16 tracking-body mb-50"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <ul className="flex flex-wrap pt-20 text-left">
          {services.map((service, index) => (
            <li
              className={`flex items-start w-1/2 border-gray-border pr-40 odd:border-r ${
                index > 1 ? `pb-10 pt-40 border-t` : `pt-10 pb-40`
              }`}
              key={service.title}
            >
              <div className="flex justify-end flex-shrink-0 min-w-110 pr-30">
                <img
                  src={service.icon.imageFile.childImageSharp.fluid.src}
                  alt={service.icon.altText}
                  width={service.icon.mediaDetails.width / 2}
                  height={service.icon.mediaDetails.height / 2}
                />
              </div>
              <section>
                <h2 className="pt-4 mb-10 font-normal text-20 text-aqua-500">
                  {service.title}
                </h2>
                <div
                  className="leading-loose text-gray-400 text-16 tracking-body"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </section>
            </li>
          ))}
        </ul>

        <footer className="pt-55">
          <Button
            to={button1.url}
            target={button1.target}
            secondary
            additionalClasses="mx-17 mb-6 md:mb-0"
          >
            {button1.title}
          </Button>

          <Button
            to={button2.url}
            target={button2.target}
            ghost
            additionalClasses="mx-17 mb-6 md:mb-0"
          >
            {button2.title}
          </Button>
        </footer>
      </div>
    </div>
  </section>
)

ServiceShowcase.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  content: string.isRequired,
  services: arrayOf(
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
  ).isRequired,
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

export default ServiceShowcase
