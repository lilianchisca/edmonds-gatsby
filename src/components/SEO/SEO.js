import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { decode } from 'he'

const SEO = ({ description, lang, meta, title }) => {
  const {
    wpgraphql: { generalSettings },
  } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          generalSettings {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || generalSettings.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={decode(title)}
      titleTemplate="%s"
      meta={[
        {
          name: `description`,
          content: decode(metaDescription),
        },
        {
          property: `og:title`,
          content: decode(title),
        },
        {
          property: `og:description`,
          content: decode(metaDescription),
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: generalSettings.title,
        },
        {
          name: `twitter:title`,
          content: decode(title),
        },
        {
          name: `twitter:description`,
          content: decode(metaDescription),
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
