import React from 'react'
import { oneOfType, arrayOf, node, string, func, bool } from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'

const UNIVERSALLINK_QUERY = graphql`
  query GETUNIVERSALLINK {
    wpgraphql {
      generalSettings {
        url
      }
    }
  }
`

const createLocalLink = (url, wordPressUrl) => {
  if (url === `#`) {
    return null
  }

  const newUri = url.replace(wordPressUrl, ``)

  return newUri
}

const UniversalLink = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  getProps,
  primary,
  secondary,
  ghost,
  ...other
}) => {
  const { wpgraphql } = useStaticQuery(UNIVERSALLINK_QUERY)
  const wordPressUrl = wpgraphql.generalSettings.url

  const internal = to && /^\/(?!\/)/.test(createLocalLink(to, wordPressUrl))

  if (internal) {
    return (
      <GatsbyLink
        to={createLocalLink(to, wordPressUrl)}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        getProps={getProps}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

UniversalLink.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  to: string,
  activeClassName: string,
  partiallyActive: string,
  getProps: func,
  primary: bool,
  secondary: bool,
  ghost: bool,
}

export default UniversalLink
