import React, { useEffect, useState } from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'
import contentParser from 'gatsby-wpgraphql-inline-images'
import { wordPressUrl, uploadsUrl } from '../../utils/constants'

import Layout from '../../layouts/Layout'
import SEO from '../../components/SEO'
import useScrollDirection from '../../hooks/useScrollDirection'
import UniversalLink from '../../components/UniversalLink'

const StyledHeading = styled.h1`
  span {
    display: block;
  }

  > span {
    overflow: hidden;

    span {
      transform: translateY(100%);
      transition: all 0.7s;
      transition-delay: 0.3s;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #6784c9;
    height: 2px;
    transform: translateX(-50%);
    left: 50%;
    transition: all 1s;
    transition-delay: 0.5s;
    max-width: 0;
  }

  &::before {
    bottom: -30px;
    width: 52px;
  }

  &::after {
    bottom: -40px;
    width: 26px;
  }

  &.is-active {
    &::before,
    &::after {
      max-width: 52px;
    }

    > span {
      span {
        transform: none;
      }
    }
  }
`

const ServiceTemplate = ({ pageContext }) => {
  const {
    service: { title, content, uri, serviceTags, seo },
  } = pageContext
  const [inView, setInView] = useState(false)
  const { isUp } = useScrollDirection()
  const sidebarTitle = serviceTags ? serviceTags.edges[0].node.name : ``
  const sidebarLinks = serviceTags
    ? serviceTags.edges[0].node.services.nodes.filter(link => link.uri !== uri)
    : []

  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <Layout>
      <SEO title={seo.title} description={seo.metaDesc} />
      <section className="overflow-hidden bg-blue-600 border-yellow-500 border-b-5">
        <div className="relative flex items-center justify-center overflow-hidden min-h-330">
          <div className="relative w-full mx-auto text-center text-white max-w-1020 px-30 pt-55">
            <StyledHeading
              className={`relative font-normal text-white text-24 sm:text-27 md:text-34 lg:text-40 leading-heading ${
                inView ? `is-active` : ``
              }`}
            >
              <span>
                <span>{title}</span>
              </span>
            </StyledHeading>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-1460 px-30 pt-120 pb-90">
          <div className="flex flex-wrap -mx-40">
            <div className="w-2/3 px-40">
              <div className="text-left servicecontentblock max-w-790">
                {contentParser({ content }, { wordPressUrl, uploadsUrl })}
              </div>
            </div>

            <div className="w-1/3 px-40">
              <div
                className={`sticky ${
                  isUp ? `top-120` : `top-50`
                } pb-50 transition-all duration-300`}
              >
                <h2 className="mb-40 font-normal text-30">
                  Other {sidebarTitle} Services
                </h2>
                <ul>
                  {sidebarLinks &&
                    sidebarLinks.map(link => (
                      <li className="mb-25" key={link.title}>
                        <UniversalLink
                          className="text-aqua-500 link-line-revicon text-16 tracking-body"
                          to={`/${link.uri}`}
                        >
                          <span />
                          <span>{link.title}</span>
                        </UniversalLink>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

ServiceTemplate.propTypes = {
  pageContext: shape({
    page: shape({
      title: string.isRequired,
    }),
  }),
}

export default ServiceTemplate
