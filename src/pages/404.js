import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../layouts/Layout'
import Button from '../components/Button'

const StyledHeading = styled.h1`
  span {
    display: block;
  }

  > span {
    overflow: hidden;

    span {
      transform: translateY(120%);
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

const NOTFOUND_QUERY = graphql`
  query GETNOTFOUND {
    wpgraphql {
      themeOptions {
        themeOptions {
          notFoundPageButton1 {
            target
            title
            url
          }
          notFoundPageButton2 {
            target
            title
            url
          }
          notFoundPageContent
          notFoundPageSubtitle
          notFoundPageTitle
        }
      }
    }
  }
`

const PageNotFound = () => {
  const { wpgraphql } = useStaticQuery(NOTFOUND_QUERY)
  const {
    notFoundPageButton1,
    notFoundPageButton2,
    notFoundPageContent,
    notFoundPageSubtitle,
    notFoundPageTitle,
  } = wpgraphql.themeOptions.themeOptions
  const [inView, setInView] = useState(false)

  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <Layout>
      <div className="bg-blue-600 border-yellow-500 h-134 border-b-5" />
      <div className="text-center bg-aqua-200 pt-200 pb-220">
        <div className="mx-auto max-w-980 px-30">
          <StyledHeading
            className={`mb-80 relative font-normal text-110 leading-heading-lg ${
              inView ? `is-active` : ``
            }`}
          >
            <span className="pb-10">
              <span>{notFoundPageTitle}</span>
            </span>
          </StyledHeading>
          <h2 className="mx-auto max-w-630 text-26 font-noraml leading-body-lg mb-30">
            {notFoundPageSubtitle}
          </h2>
          <div
            className="mx-auto mb-40 text-gray-400 max-w-730 text-16 tracking-body"
            dangerouslySetInnerHTML={{ __html: notFoundPageContent }}
          />
          <footer>
            <Button
              to={notFoundPageButton1.url}
              target={notFoundPageButton1.target}
              secondary
              additionalClasses="mx-17 mb-6 md:mb-0"
            >
              {notFoundPageButton1.title}
            </Button>

            <Button
              to={notFoundPageButton2.url}
              target={notFoundPageButton2.target}
              ghost
              additionalClasses="mx-17 mb-6 md:mb-0"
            >
              {notFoundPageButton2.title}
            </Button>
          </footer>
        </div>
      </div>
    </Layout>
  )
}

export default PageNotFound
