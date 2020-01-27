import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import getSection from './getSection'

function isServer() {
  return typeof window === `undefined`
}

function staticRenderSection(index, htmlEl) {
  return (
    <section
      key={index.toString()}
      dangerouslySetInnerHTML={{ __html: htmlEl.innerHTML }}
    />
  )
}

function renderSection(sectionPath, rowData, index, fallback = null) {
  const SectionComponent = loadable(() => import(`./${sectionPath}`))
  return (
    <SectionComponent
      key={index}
      sectionIndex={index}
      {...rowData}
      fallback={fallback}
    />
  )
}

function Sections({ sections }) {
  const renderSections = useMemo(
    () =>
      sections.map(({ fieldGroupName, ...rowData }, index) => {
        const type = fieldGroupName.replace(`page_Builder_Sections_`, ``)
        const { sectionPath, shouldLoadJavascript } = getSection(type)
        const sectionIndex = `${type}-${index}`

        if (isServer()) {
          return renderSection(sectionPath, rowData, sectionIndex)
        }

        const wasUserPreviouslyOnSite = window.history.state
        const htmlEl = document.querySelector(
          `[data-section-index="${sectionIndex}"]`
        )
        if (htmlEl && !shouldLoadJavascript && !wasUserPreviouslyOnSite) {
          return staticRenderSection(sectionIndex, htmlEl)
        }

        const fallback = htmlEl
          ? staticRenderSection(sectionIndex, htmlEl)
          : null
        return renderSection(sectionPath, rowData, sectionIndex, fallback)
      }),
    [sections]
  )

  return renderSections
}

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(Sections)
