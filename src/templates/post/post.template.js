import React, { useEffect, useState } from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'
import moment from 'moment/moment'
import contentParser from 'gatsby-wpgraphql-inline-images'
import gql from 'graphql-tag'
import { graphql } from 'gatsby'

import { wordPressUrl, uploadsUrl } from '../../utils/constants'

import Layout from '../../layouts/Layout'
import SEO from '../../components/SEO'
import UniversalLink from '../../components/UniversalLink'
import BackgroundImage from '../../components/BackgroundImage'
import RellaxParallax from '../../components/RellaxParallax'
import withPreview from '../../components/withPreview'
import { PostPreviewQuery } from './post.data'

const Chevron = styled.div`
  width: 6px;
  height: 11px;
  background: url('/images/chevron.png') no-repeat center / 100% 100%;
  margin-left: 20px;
  margin-right: 20px;
`

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

const PostTemplate = ({ preview, pageContext, data }) => {
  const {
    title,
    date,
    author,
    slug,
    content,
    featuredImage,
    categories,
  } = preview ? preview.postBy : pageContext.post
  const propPosts = preview ? preview.posts.edges : data.wpgraphql.posts.edges
  const posts = propPosts
    .map(({ node }) => node)
    .filter(post => post.slug !== slug)
  const { singleBlogCalloutLink, singleBlogCalloutTitle } = preview
    ? preview.themeOptions.themeOptions
    : data.wpgraphql.themeOptions.themeOptions
  const [inView, setInView] = useState(false)
  const category = categories.nodes.filter(({ name }) => name !== `Featured`)

  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <Layout>
      <SEO title={title} />
      <section className="overflow-hidden bg-blue-600 border-yellow-500 border-b-5">
        <div className="relative flex items-center justify-center overflow-hidden min-h-330">
          <div className="relative w-full mx-auto text-center text-white max-w-1020 px-30 pt-55">
            <StyledHeading
              className={`relative font-normal text-white text-24 sm:text-27 md:text-34 lg:text-40 leading-heading ${
                inView ? `is-active` : ``
              }`}
            >
              <span>
                <span>Our Blog</span>
              </span>
            </StyledHeading>
          </div>
        </div>
      </section>
      <div className="py-20 bg-aqua-200">
        <div className="mx-auto max-w-1460 px-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UniversalLink
                to="/news"
                className="link-line text-14 font-heading"
              >
                News
              </UniversalLink>
              <Chevron />
              {category && category[0] && category[0].slug && (
                <>
                  <UniversalLink
                    to={`/category/${category[0].slug}/`}
                    className="link-line text-14 font-heading"
                  >
                    {category[0].name}
                  </UniversalLink>
                  <Chevron />
                </>
              )}
              <UniversalLink
                to={`/news/${slug}`}
                className="link-line text-14 font-heading"
              >
                {title}
              </UniversalLink>
            </div>

            <div className="flex items-center">
              <UniversalLink
                to="/news/"
                className="link-line-icon link-line-icon--sm text-14 font-heading"
              >
                <span>Return to News</span>
                <span />
              </UniversalLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto text-center max-w-1460 px-30 pt-100 pb-90">
          <h3 className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
            {moment(date).format(`D/MM/YY`)}
          </h3>
          <h2 className="mb-20 font-normal text-32 leading-body">{title}</h2>
          <p className="text-gray-300 uppercase text-14 font-body tracking-button">
            by <span className="text-aqua-500">{author.name}</span>
          </p>

          <div className="flex justify-center mt-90">
            <div className="relative w-full overflow-hidden max-w-910 h-460 rounded-5 shadow-box">
              <RellaxParallax
                center
                className="absolute inset-x-0 -top-16 -bottom-16"
                speed="-0.5"
              >
                <BackgroundImage
                  image={
                    featuredImage.imageFile
                      ? featuredImage.imageFile.childImageSharp.fluid
                      : featuredImage.sourceUrl
                  }
                  additionalClasses="absolute h-full inset-0"
                  fallback={preview}
                />
              </RellaxParallax>
            </div>
          </div>
          <div className="mx-auto text-left py-80 max-w-670 contentblock">
            {contentParser({ content }, { wordPressUrl, uploadsUrl })}
          </div>
          <div className="pt-10 pb-30">
            <h3 className="mx-auto font-normal text-center max-w-670 text-27 leading-heading-xl">
              <span>{singleBlogCalloutTitle}&nbsp;</span>
              <UniversalLink
                to={singleBlogCalloutLink.url}
                className="text-aqua-500 link-line-icon link-line-icon--sm"
                target={singleBlogCalloutLink.target}
              >
                <span>{singleBlogCalloutLink.title}</span>
                <span />
              </UniversalLink>
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-aqua-200 pt-130 pb-120">
        <div className="mx-auto text-center max-w-1460 px-30">
          <h2 className="font-normal text-27 leading-body">Related Posts</h2>

          <ul className="flex flex-wrap pt-70 -mx-25">
            {posts.map(post => (
              <li className="w-1/3 px-25" key={post.id}>
                <UniversalLink
                  to={`/news/${post.slug}/`}
                  className="flex flex-col h-full overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none"
                >
                  <header className="relative h-220 overflow">
                    <BackgroundImage
                      image={
                        post.featuredImage.imageFile
                          ? post.featuredImage.imageFile.childImageSharp.fluid
                          : post.featuredImage.sourceUrl
                      }
                      additionalClasses="absolute inset-0 pointer-events-none"
                      fallback={preview}
                    />
                  </header>
                  <section className="flex flex-col flex-grow py-35 px-45">
                    <p className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
                      {moment(post.date).format(`D/MM/YY`)}
                    </p>
                    <h3 className="font-normal mb-35 text-22 leading-body">
                      {post.title}
                    </h3>
                    <footer className="mt-auto">
                      <span className="leading-loose uppercase text-aqua-500 text-14 font-body tracking-button link-line-shrink">
                        Read more
                      </span>
                    </footer>
                  </section>
                </UniversalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

PostTemplate.propTypes = {
  pageContext: shape({
    page: shape({
      title: string.isRequired,
    }),
  }),
}

const PREVIEW_QUERY = gql(PostPreviewQuery)

export const query = graphql`
  query($category: String!) {
    wpgraphql {
      posts(where: { categoryName: $category }, first: 4) {
        edges {
          node {
            id
            slug
            date
            title
            featuredImage {
              sourceUrl
              altText
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 860, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
      themeOptions {
        themeOptions {
          singleBlogCalloutLink {
            target
            title
            url
          }
          singleBlogCalloutTitle
        }
      }
    }
  }
`

export default withPreview({ preview: PREVIEW_QUERY })(PostTemplate)
