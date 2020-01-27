import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import UniversalLink from '../UniversalLink'

const ByLink = styled.a`
  position: relative;
  display: inline-block;
  color: #fff;

  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.5s ease;
    content: '';
  }

  &:hover {
    span {
      transition: all 0.3s;
      color: #16b6ea;
    }

    &::before {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`

const FooterBg = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: url('/images/footerbg.png') no-repeat bottom center / 100% auto;
`

const FOOTER_QUERY = graphql`
  fragment MenuItem on WPGraphQL_MenuItem {
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
  query GETFOOTER {
    wpgraphql {
      column1Items: menuItems(where: { location: FOOTER_COLUMN_1_NAVIGATION }) {
        nodes {
          ...MenuItem
        }
      }
      column2Items: menuItems(where: { location: FOOTER_COLUMN_2_NAVIGATION }) {
        nodes {
          ...MenuItem
        }
      }
      bottomItems: menuItems(where: { location: FOOTER_BOTTOM_NAVIGATION }) {
        nodes {
          ...MenuItem
        }
      }
      themeOptions {
        themeOptions {
          footerCalloutLink {
            target
            title
            url
          }
          footerCalloutTitle
          footerColumn1Title
          footerColumn2Title
          footerCopyrightText
          footerLogo {
            sourceUrl
            altText
            mediaItemId
            mediaDetails {
              width
              height
            }
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 400, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          footerPhoneNumbers {
            location
            phoneNumber
          }
          emailAddress
          address
        }
      }
    }
  }
`

const Footer = () => {
  const { wpgraphql } = useStaticQuery(FOOTER_QUERY)
  const column1Items = wpgraphql.column1Items.nodes
  const column2Items = wpgraphql.column1Items.nodes
  const bottomItems = wpgraphql.bottomItems.nodes
  const {
    footerCalloutLink,
    footerCalloutTitle,
    footerColumn1Title,
    footerColumn2Title,
    footerCopyrightText,
    footerLogo,
    footerPhoneNumbers,
    emailAddress,
    address,
  } = wpgraphql.themeOptions.themeOptions

  return (
    <footer className="relative overflow-hidden bg-blue-600 border-yellow-500 border-t-5 pt-120 pb-80">
      <FooterBg />
      <div className="relative mx-auto max-w-1460 px-30">
        <div className="text-center">
          <h2 className="font-normal text-40 leading-right font-heading">
            <span className="text-white">{footerCalloutTitle}</span>
            <br />
            <UniversalLink
              className="text-yellow-500 link-line-icon"
              to={footerCalloutLink.url}
              target={footerCalloutLink.target}
            >
              <span>{footerCalloutLink.title}</span>
              <span />
            </UniversalLink>
          </h2>
        </div>

        <div className="flex flex-wrap pt-100">
          <div className="w-1/4 pr-60">
            <h3 className="uppercase mb-17 text-aqua-500 text-14 tracking-button font-body">
              {footerColumn1Title}
            </h3>

            <ul>
              {column1Items &&
                column1Items.map(menuItem => (
                  <li key={menuItem.id} className="mb-10">
                    <UniversalLink
                      to={menuItem.url}
                      className="text-white opacity-75 text-14 link-line tracking-footer"
                    >
                      {menuItem.label}
                    </UniversalLink>
                  </li>
                ))}
            </ul>
          </div>

          <div className="w-1/4 pr-60">
            <h3 className="uppercase mb-17 text-aqua-500 text-14 tracking-button font-body">
              {footerColumn2Title}
            </h3>

            <ul>
              {column2Items &&
                column2Items.map(menuItem => (
                  <li key={menuItem.id} className="mb-10">
                    <UniversalLink
                      to={menuItem.url}
                      className="text-white opacity-75 text-14 link-line tracking-footer"
                    >
                      {menuItem.label}
                    </UniversalLink>
                  </li>
                ))}
            </ul>
          </div>

          <div className="w-1/4 pr-60">
            <h3 className="uppercase mb-17 text-aqua-500 text-14 tracking-button font-body">
              Find Us
            </h3>

            <div
              className="leading-loose text-white opacity-75 text-14 tracking-footer"
              dangerouslySetInnerHTML={{ __html: address }}
            />
          </div>

          <div className="w-1/4 pl-40 pr-60">
            <h3 className="mb-10 uppercase text-aqua-500 text-14 tracking-button font-body">
              Call us
            </h3>

            <div className="leading-loose text-white opacity-75 text-14 tracking-footer">
              {footerPhoneNumbers &&
                footerPhoneNumbers.map(({ location, phoneNumber }) => (
                  <p className="pt-7" key={location}>
                    <strong>{location}</strong>
                    <br />
                    <a
                      className="text-white text-14 link-line tracking-footer"
                      href={`tel:${phoneNumber}`}
                    >
                      {phoneNumber}
                    </a>
                  </p>
                ))}
            </div>

            <h3 className="uppercase mt-25 mb-17 text-aqua-500 text-14 tracking-button font-body">
              Email us
            </h3>

            <a
              className="text-white text-14 link-line tracking-footer"
              href={`mailto:${emailAddress}`}
            >
              {emailAddress}
            </a>
          </div>
        </div>

        <div className="text-center pt-27">
          <img
            src={footerLogo.imageFile.childImageSharp.fluid.src}
            alt={footerLogo.altText}
            width={footerLogo.mediaDetails.width / 2}
            height={footerLogo.mediaDetails.height / 2}
            className="mx-auto"
          />

          <div className="flex items-center justify-center text-white opacity-75 pt-60 text-14 tracking-footer">
            <div dangerouslySetInnerHTML={{ __html: footerCopyrightText }} />

            {bottomItems &&
              bottomItems.map(menuItem => (
                <UniversalLink
                  key={menuItem.id}
                  to={menuItem.url}
                  className="ml-20 text-white link-line"
                >
                  {menuItem.label}
                </UniversalLink>
              ))}
          </div>

          <div className="flex items-center justify-center text-white opacity-75 pt-17 text-14 tracking-footer">
            Made by&nbsp;
            <ByLink
              href="https://www.code23.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code<span>23</span>
            </ByLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
