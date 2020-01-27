import React from 'react'
import { string, shape } from 'prop-types'

import Button from '../../components/Button'

const CalloutSection = ({ sectionIndex, pretitle, title, content, button }) => (
  <section data-section-index={sectionIndex}>
    <div className="text-center pt-65 pb-110 bg-aqua-200">
      <div className="mx-auto max-w-980 px-30">
        <h3 className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
          {pretitle}
        </h3>
        <h2 className="font-normal leading-tight mb-25 text-27">{title}</h2>
        <div
          className="leading-loose text-gray-400 text-16 tracking-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <footer className="pt-30">
          <Button
            to={button.url}
            target={button.target}
            secondary
            additionalClasses="mx-17 mb-6 md:mb-0"
          >
            {button.title}
          </Button>
        </footer>
      </div>
    </div>
  </section>
)

CalloutSection.propTypes = {
  sectionIndex: string,
  pretitle: string.isRequired,
  title: string.isRequired,
  content: string.isRequired,
  button: shape({
    url: string,
    title: string,
    target: string,
  }),
}

export default CalloutSection
