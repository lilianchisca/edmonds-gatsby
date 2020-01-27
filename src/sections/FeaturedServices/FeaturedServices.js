import React from 'react'
import { bool, shape, arrayOf, string, number } from 'prop-types'

import UniversalLink from '../../components/UniversalLink'
import Button from '../../components/Button'

const FeaturedServices = ({
  sectionIndex,
  alternativeStyle,
  title,
  services,
  content,
  button,
  bottomLogos,
}) => (
  <section data-section-index={sectionIndex}>
    <div
      className={`bg-aqua-200 pt-70 pb-110 ${
        alternativeStyle ? `relative` : ``
      }`}
    >
      {alternativeStyle && (
        <div className="absolute inset-x-0 top-0 bg-white h-295" />
      )}
      <div className="relative z-10 mx-auto max-w-1120 px-30">
        {title && (
          <h2 className="font-normal text-center text-32 leading-body mb-55">
            {title}
          </h2>
        )}
        <ul className="flex flex-wrap -mx-30">
          {services &&
            services.map((service, index) => (
              <li className="w-1/3 px-30" key={service.title}>
                {alternativeStyle ? (
                  <div className="block h-full overflow-hidden text-center bg-white rounded-5 shadow-box transition-all duration-300 hover:shadow-none">
                    <h3
                      className={`font-normal text-22 leading-heading py-25 px-70 ${
                        index === 0
                          ? `bg-aqua-500 text-white`
                          : index === 1
                          ? `bg-yellow-500 text-blue-500`
                          : `bg-blue-500 text-white`
                      }`}
                    >
                      {service.title}
                    </h3>
                    <ul className="flex flex-wrap pt-35">
                      {service.items &&
                        service.items.map(item => (
                          <li
                            className="flex items-center justify-center w-full pt-2 pb-20"
                            key={item.title}
                          >
                            <img
                              src={
                                item.icon.imageFile.childImageSharp.fluid.src
                              }
                              alt={item.icon.altText}
                              width={item.icon.mediaDetails.width / 2}
                              height={item.icon.mediaDetails.height / 2}
                            />
                            <p className="font-normal text-gray-500 ml-15 text-14 tracking-heading leading-heading">
                              {item.title}
                            </p>
                          </li>
                        ))}
                    </ul>
                    <footer className="pt-20 pb-30">
                      <Button
                        to={service.link.url}
                        target={service.link.target}
                        ghost
                      >
                        {service.link.title}
                      </Button>
                    </footer>
                  </div>
                ) : (
                  <UniversalLink
                    to={service.link.url}
                    target={service.link.target}
                    className="block h-full overflow-hidden text-center bg-white rounded-5 shadow-box transition-all duration-300 hover:shadow-none"
                  >
                    <h3
                      className={`font-normal text-22 leading-heading py-25 px-70 ${
                        index === 0
                          ? `bg-aqua-500 text-white`
                          : index === 1
                          ? `bg-yellow-500 text-blue-500`
                          : `bg-blue-500 text-white`
                      }`}
                    >
                      {service.title}
                    </h3>
                    <ul className="flex flex-wrap">
                      {service.items &&
                        service.items.map(item => (
                          <li
                            className="w-1/2 pt-2 pb-20 border-b border-gray-200 odd:border-r"
                            key={item.title}
                          >
                            <header className="flex items-center justify-center h-70">
                              <img
                                src={
                                  item.icon.imageFile.childImageSharp.fluid.src
                                }
                                alt={item.icon.altText}
                                width={item.icon.mediaDetails.width / 2}
                                height={item.icon.mediaDetails.height / 2}
                              />
                            </header>
                            <p className="font-normal text-gray-500 text-14 tracking-heading leading-heading">
                              {item.title}
                            </p>
                          </li>
                        ))}
                    </ul>
                    <footer className="py-41">
                      <span className="leading-relaxed text-blue-500 uppercase text-14 tracking-button link-line-shrink">
                        {service.link.title}
                      </span>
                    </footer>
                  </UniversalLink>
                )}
              </li>
            ))}
        </ul>
        <div
          className="pb-40 mx-auto leading-loose text-center text-gray-400 pt-68 text-16 tracking-body max-w-980"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="text-center">
          <Button to={button.url} target={button.target} secondary>
            {button.title}
          </Button>
        </div>
        {bottomLogos && (
          <ul className="flex items-center justify-center pt-45">
            {bottomLogos.map(({ logo }) => (
              <li
                key={logo.imageFile.childImageSharp.fluid.src}
                className="px-27"
              >
                <img
                  src={logo.imageFile.childImageSharp.fluid.src}
                  alt={logo.altText}
                  width={logo.mediaDetails.width / 2}
                  height={logo.mediaDetails.height / 2}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
)

FeaturedServices.propTypes = {
  sectionIndex: string,
  alternativeStyle: bool,
  title: string,
  services: arrayOf(
    shape({
      title: string.isRequired,
      items: arrayOf(
        shape({
          title: string.isRequired,
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
      link: shape({
        url: string,
        title: string,
        target: string,
      }).isRequired,
    })
  ),
  content: string.isRequired,
  button: shape({
    url: string,
    title: string,
    target: string,
  }),
  bottomLogos: arrayOf(
    shape({
      logo: shape({
        imageFile: shape({
          mediaDetails: shape({
            width: number,
            height: number,
          }),
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
    })
  ),
}

export default FeaturedServices
