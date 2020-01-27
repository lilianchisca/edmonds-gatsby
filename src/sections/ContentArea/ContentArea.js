import React from 'react'
import { string } from 'prop-types'

const ContentArea = ({ sectionIndex, content }) => (
  <section data-section-index={sectionIndex}>
    <div className="mx-auto max-w-1460 px-30">
      <div className="mx-auto max-w-670 pt-140 pb-140">
        <div
          className="contentblock"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  </section>
)

ContentArea.propTypes = {
  sectionIndex: string,
  content: string.isRequired,
}

export default ContentArea
