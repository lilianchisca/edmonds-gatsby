import React from 'react'
import { string } from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import moment from 'moment/moment'

import BackgroundImage from '../../components/BackgroundImage'
import UniversalLink from '../../components/UniversalLink/UniversalLink'

const LATESTPOSTS_QUERY = graphql`
  query LATESTPOSTS {
    wpgraphql {
      firstPost: posts(first: 1) {
        edges {
          node {
            id
            slug
            title
            featuredImage {
              sourceUrl
              altText
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            excerpt
            date
          }
        }
      }
      otherPosts: posts(first: 3) {
        edges {
          node {
            id
            slug
            title
            featuredImage {
              sourceUrl
              altText
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 620, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            excerpt
            date
          }
        }
      }
    }
  }
`

const LatestPosts = ({ sectionIndex, pretitle, title }) => {
  const { wpgraphql } = useStaticQuery(LATESTPOSTS_QUERY)
  const firstPost = wpgraphql.firstPost.edges[0].node
  const otherPosts = wpgraphql.otherPosts.edges
    .filter((node, index) => index > 0)
    .map(({ node }) => node)

  return (
    <section data-section-index={sectionIndex} className="bg-white">
      <div className="mx-auto max-w-1460 px-30">
        <div className="relative pb-20 pt-100">
          <div className="absolute inset-0 flex">
            <div className="w-1/5 h-full border-l border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
            <div className="w-1/5 h-full border-r border-gray-100" />
          </div>

          <div className="relative text-center">
            <h3 className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
              {pretitle}
            </h3>
            <h2 className="font-normal text-26 leading-body mb-55">{title}</h2>

            <div className="flex flex-wrap text-left -mx-29">
              <div className="w-1/2 px-25">
                <UniversalLink
                  to={`/news/${firstPost.slug}`}
                  className="flex flex-col h-full overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none"
                >
                  <header className="relative overflow-hidden h-300">
                    <BackgroundImage
                      image={
                        firstPost.featuredImage.imageFile.childImageSharp.fluid
                      }
                      additionalClasses="absolute inset-0 pointer-events-none"
                    />
                  </header>
                  <section className="flex flex-col flex-grow py-35 px-45">
                    <p className="mb-10 text-gray-300 uppercase text-14 font-body tracking-button">
                      {moment(firstPost.date).format(`D/MM/YY`)}
                    </p>
                    <h3 className="font-normal mb-15 text-26 leading-body">
                      {firstPost.title}
                    </h3>
                    <div
                      className="leading-loose text-gray-400 text-16 tracking-body"
                      dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}
                    />
                    <footer className="mt-auto">
                      <span className="leading-loose uppercase text-aqua-500 text-14 font-body tracking-button link-line-shrink">
                        Read more
                      </span>
                    </footer>
                  </section>
                </UniversalLink>
              </div>
              <div className="w-1/2 px-25">
                {otherPosts &&
                  otherPosts.map((post, index) => (
                    <UniversalLink
                      to={`/news/${post.slug}`}
                      key={post.id}
                      className={`flex flex-wrap overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none ${
                        index > 0 ? `mt-45` : ``
                      }`}
                    >
                      <header className="relative w-2/5 overflow-hidden min-h-263">
                        <BackgroundImage
                          image={
                            post.featuredImage.imageFile.childImageSharp.fluid
                          }
                          additionalClasses="absolute inset-0 pointer-events-none"
                        />
                      </header>
                      <section className="flex flex-col w-3/5 py-35 px-45">
                        <p className="mb-10 text-gray-300 uppercase text-14 font-body tracking-button">
                          {moment(post.date).format(`D/MM/YY`)}
                        </p>
                        <h3 className="mb-20 font-normal text-26 leading-body">
                          {post.title}
                        </h3>
                        <footer className="mt-auto">
                          <span className="leading-loose uppercase text-aqua-500 text-14 font-body tracking-button link-line-shrink">
                            Read more
                          </span>
                        </footer>
                      </section>
                    </UniversalLink>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

LatestPosts.propTypes = {
  sectionIndex: string,
  pretitle: string.isRequired,
  title: string.isRequired,
}

export default LatestPosts
