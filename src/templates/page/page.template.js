import React from 'react'
import { shape, string, arrayOf, object } from 'prop-types'

import Layout from '../../layouts/Layout'
import SEO from '../../components/SEO'
import Sections from '../../sections/Sections'

const PageTemplate = ({ pageContext }) => {
  const {
    page: { builder, seo },
  } = pageContext

  return (
    <Layout>
      <SEO title={seo.title} description={seo.metaDesc} />
      <Sections sections={builder.sections} />
    </Layout>
  )
}

PageTemplate.propTypes = {
  pageContext: shape({
    page: shape({
      title: string.isRequired,
      builder: shape({
        sections: arrayOf(object).isRequired,
      }).isRequired,
    }),
  }),
}

export default PageTemplate
