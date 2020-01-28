import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import UniversalLink from '../UniversalLink'
import Button from '../Button'
import { useScrollYPosition } from '../../hooks/useScrollPosition'
import useScrollDirection from '../../hooks/useScrollDirection'
import Logo from '../../icons/logo.inline.svg'

const StyledDropdown = styled.div`
  position: relative;

  &:hover {
    .submenu {
      opacity: 1;
      visibility: visible;
      transform: none;
    }
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 270px;
    padding-top: 27px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(5px);
    transition: all 0.3s;

    ul {
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transform: translateX(-50%);
      display: block;
      width: 100%;
      position: relative;

      &::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 9.5px 11px 9.5px;
        border-color: transparent transparent #ffffff transparent;
        position: absolute;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
      }

      li {
        display: flex;
        text-align: center;
        height: 67px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #f2f4f6;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
`

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

          <nav className="flex items-center ml-10">
            {menuItems &&
              menuItems.map(menuItem =>
                menuItem.childItems.edges.length > 0 ? (
                  <StyledDropdown className="ml-45" key={menuItem.id}>
                    <UniversalLink
                      to={menuItem.url}
                      getProps={({ isCurrent }) =>
                        isCurrent
                          ? {
                              className: `text-14 tracking-button uppercase leading-relaxed text-white link-line-shrink`,
                            }
                          : {
                              className: `text-14 tracking-button uppercase leading-relaxed text-white link-line`,
                            }
                      }
                    >
                      {menuItem.label}
                    </UniversalLink>
                    <div className="submenu">
                      <ul>
                        {menuItem.childItems.edges.map(({ node }) => (
                          <li key={node.id}>
                            <UniversalLink
                              to={node.url}
                              getProps={({ isCurrent }) =>
                                isCurrent
                                  ? {
                                      className: `text-17 font-heading leading-relaxed text-aqua-500 link-line-shrink`,
                                    }
                                  : {
                                      className: `text-17 font-heading leading-relaxed text-blue-500 link-line`,
                                    }
                              }
                            >
                              {node.label}
                            </UniversalLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StyledDropdown>
                ) : (
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
                )
              )}
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
