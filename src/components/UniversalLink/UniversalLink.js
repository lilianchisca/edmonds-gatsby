import React, { useRef } from 'react'
import { oneOfType, arrayOf, node, string, func, bool } from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import { TimelineMax, gsap } from 'gsap/all'

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
  const coverWrap = useRef(null)
  const coverEl = useRef(null)
  const internal = to && /^\/(?!\/)/.test(createLocalLink(to, wordPressUrl))

  if (internal) {
    const ease = gsap.parseEase(`.34,.07,.095,.995`)

    return (
      <>
        <TransitionLink
          exit={{
            length: 1.6,
            trigger: ({ exit: { length: seconds }, node: oldNode }) => {
              const directionTo = `100%`
              const directionFrom = `-100%`

              const wait = seconds / 6
              const half = (seconds - wait) / 2

              return new TimelineMax()
                .set([coverWrap.current, coverEl.current], { y: directionFrom })
                .to([coverWrap.current, coverEl.current], half, {
                  y: `0%`,
                  ease,
                })
                .set(oldNode, { opacity: 0 })
                .to(
                  coverWrap.current,
                  half,
                  {
                    opacity: 0,
                    ease,
                  },
                  `+=${wait}`
                )
            },
          }}
          entry={{
            delay: 0.8,
          }}
          to={createLocalLink(to, wordPressUrl)}
          activeClassName={activeClassName}
          partiallyActive={partiallyActive}
          getProps={getProps}
          {...other}
        >
          {children}
        </TransitionLink>
        <TransitionPortal>
          <div
            ref={coverWrap}
            style={{
              position: `fixed`,
              background: `#ebb221`,
              top: 0,
              left: 0,
              width: `100vw`,
              height: `100vh`,
              transform: `translateY(-100%)`,
            }}
          >
            <div
              ref={coverEl}
              style={{
                position: `fixed`,
                background: `#00254a`,
                top: 0,
                left: 0,
                width: `100vw`,
                height: `100vh`,
                transform: `translateY(-100%)`,
              }}
            />
          </div>
        </TransitionPortal>
      </>
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
