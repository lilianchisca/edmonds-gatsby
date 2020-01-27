import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import UniversalLink from '../UniversalLink'
import Button from '../Button'
import { useScrollYPosition } from '../../hooks/useScrollPosition'
import useScrollDirection from '../../hooks/useScrollDirection'
import Logo from '../../icons/logo.inline.svg'

const MENU_QUERY = graphql`
  query GETMAINMENU {
    wpgraphql {
      menuItems(where: { location: PRIMARY_NAVIGATION }) {
        nodes {
          id
          label
          url
          title
          target
          childItems {
            edges {
              node {
                id
                label
                url
                title
                target
              }
            }
          }
        }
      }
      themeOptions {
        themeOptions {
          phoneNumber
          headerButton {
            target
            title
            url
          }
        }
      }
    }
  }
`

const Header = () => {
  const [overlayToggled, setOverlay] = useState(false)
  const { wpgraphql } = useStaticQuery(MENU_QUERY)
  const menuItems = wpgraphql.menuItems.nodes
  const {
    themeOptions: { headerButton, phoneNumber },
  } = wpgraphql.themeOptions
  const scrollY = useScrollYPosition()
  const { isUp } = useScrollDirection()

  return (
    <header
      className={`text-reset transform fixed inset-x-0 top-0 z-50 border-blue-500 border-t-9 px-30 duration-300 transition-all ${
        scrollY > 100 && !isUp ? `-translate-y-full` : `0`
      } ${scrollY > 100 ? `bg-blue-500 pt-10 pb-19` : `bg-transparent py-27`}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <UniversalLink to="/">
            <Logo />
          </UniversalLink>

          <nav className="ml-10">
            {menuItems &&
              menuItems.map(menuItem => (
                <UniversalLink
                  key={menuItem.id}
                  to={menuItem.url}
                  getProps={({ isCurrent }) =>
                    isCurrent
                      ? {
                          className: `ml-45 text-14 tracking-button uppercase leading-relaxed text-white link-line-shrink`,
                        }
                      : {
                          className: `ml-45 text-14 tracking-button uppercase leading-relaxed text-white link-line`,
                        }
                  }
                >
                  {menuItem.label}
                </UniversalLink>
              ))}
          </nav>
        </div>

        <div className="flex items-center ml-45">
          <UniversalLink
            to={`tel:${phoneNumber}`}
            className="leading-relaxed text-white uppercase ml-45 text-14 tracking-button link-line"
          >
            {phoneNumber}
          </UniversalLink>
          <Button
            to={headerButton.url}
            target={headerButton.target}
            secondary
            additionalClasses="ml-45"
          >
            {headerButton.title}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
