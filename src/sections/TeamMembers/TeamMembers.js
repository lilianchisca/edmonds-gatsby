import React from 'react'
import { string, shape, arrayOf } from 'prop-types'

import BackgroundImage from '../../components/BackgroundImage'

const TeamMembers = ({ sectionIndex, pretitle, title, members }) => (
  <section data-section-index={sectionIndex}>
    <div className="bg-white pt-90 pb-100">
      <div className="mx-auto text-center max-w-1460 px-30">
        <h3 className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
          {pretitle}
        </h3>
        <h2 className="font-normal text-32 leading-body mb-100">{title}</h2>
        {members && (
          <ul className="flex flex-wrap -mx-25">
            {members.map(member => (
              <li className="w-1/4 px-25 mb-25" key={member.name}>
                <div className="h-full overflow-hidden pb-25 transition-all duration-300 hover:shadow-box rounded-5">
                  <header className="relative mb-20 overflow-hidden h-380 rounded-5">
                    <BackgroundImage
                      image={member.image.imageFile.childImageSharp.fluid}
                      additionalClasses="absolute inset-0"
                    />
                  </header>
                  <h3 className="mb-4 font-normal text-22 leading-body">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 uppercase text-14 font-body tracking-button">
                    {member.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
)

TeamMembers.propTypes = {
  sectionIndex: string,
  pretitle: string.isRequired,
  title: string.isRequired,
  members: arrayOf(
    shape({
      name: string.isRequired,
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
    })
  ),
}

export default TeamMembers
