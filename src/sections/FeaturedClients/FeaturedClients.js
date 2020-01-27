import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import Img from 'gatsby-image'

const FeaturedClients = ({ sectionIndex, title, clients }) => (
  <section data-section-index={sectionIndex}>
    <div className="bg-white">
      <div className="mx-auto max-w-1460 px-30">
        <div className="relative pt-80 pb-140">
          <div className="absolute inset-0 flex">
            <div className="w-1/5 h-full border-l border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
          </div>

          <div className="relative text-center">
            <h2 className="text-gray-300 uppercase mb-45 text-14 font-body tracking-button">
              {title}
            </h2>
            {clients && (
              <ul className="flex flex-wrap items-center">
                {clients.map(({ logo }) => (
                  <li
                    className="w-1/5 px-55"
                    key={logo.imageFile.childImageSharp.fluid.src}
                  >
                    <Img fluid={logo.imageFile.childImageSharp.fluid} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
)

FeaturedClients.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  clients: arrayOf(
    shape({
      logo: shape({
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

export default FeaturedClients
