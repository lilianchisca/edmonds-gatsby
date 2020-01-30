import React, { useEffect, useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import moment from 'moment/moment'
import Pagination from 'rc-pagination'
import Select from 'react-select'

import Layout from '../layouts/Layout'
import SEO from '../components/SEO'
import BackgroundImage from '../components/BackgroundImage'
import UniversalLink from '../components/UniversalLink'

const StyledFeaturedPosts = styled.div`
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    width: 974px;
    height: 468px;
    position: absolute;
    top: 50px;
    right: -175px;
    background: url('/images/blogpattern.png') no-repeat center / 100% 100%;
  }
`

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

const Quote = styled.div`
  width: 44px;
  height: 36px;
  position: absolute;
  top: 110px;
  left: ${props => props.left && `80px`};
  right: ${props => props.right && `80px`};
  background: url('/images/quote${props =>
    props.left ? `left` : `right`}.png') no-repeat center / 100% 100%;
`

const NEWS_QUERY = graphql`
  query GETNEWS {
    wpgraphql {
      featuredPosts: posts(where: { categoryName: "Featured" }, first: 2) {
        nodes {
          id
          date
          title
          slug
          excerpt
          featuredImage {
            sourceUrl
            altText
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
              id
            }
          }
        }
      }
      posts(first: 1000) {
        nodes {
          id
          date
          title
          slug
          featuredImage {
            sourceUrl
            altText
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 800, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
              id
            }
          }
        }
      }
      categories {
        nodes {
          slug
          name
        }
      }
      themeOptions {
        themeOptions {
          archiveBlogTestimonial {
            ... on WPGraphQL_Testimonial {
              id
              title
              content
              featuredImage {
                sourceUrl
                altText
                mediaItemId
                modified
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 200, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const NewsPage = () => {
  const { wpgraphql } = useStaticQuery(NEWS_QUERY)
  const { archiveBlogTestimonial } = wpgraphql.themeOptions.themeOptions
  const posts = wpgraphql.posts.nodes
  const featuredPosts = wpgraphql.featuredPosts.nodes
  const categories = wpgraphql.categories.nodes.filter(
    cat => cat.name !== `Featured` && cat.name !== `Uncategorized`
  )
  const postsWrapperRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [currPosts, setCurrPosts] = useState([])
  const [currPostsLength, setCurrPostsLength] = useState(0)
  const [currCat, setCurrCat] = useState(`all`)
  const [currSort, setCurrSort] = useState({ value: `newest`, label: `Newest` })
  const [currPage, setCurrPage] = useState(1)

  useEffect(() => {
    setInView(true)
  }, [])

  useEffect(() => {
    const filteredPosts = posts.filter(post => {
      if (currCat === `all`) {
        return true
      }
      const cats = post.categories.nodes.filter(cat => cat.slug === currCat)
      return cats.length > 0
    })
    const postsToReturn = filteredPosts.filter(
      (post, index) => index < currPage * 12 && index > (currPage - 1) * 12 - 1
    )
    if (currSort.value === `newest`) {
      setCurrPosts(postsToReturn)
    } else {
      setCurrPosts(postsToReturn.reverse())
    }
    setCurrPostsLength(filteredPosts.length)
  }, [currCat, currPage, currSort.value, posts])

  const onPaginationChange = current => {
    setCurrPage(current)
    setTimeout(() => {
      postsWrapperRef.current.scrollIntoView({
        behavior: `smooth`,
      })
    }, 100)
  }

  const handleCatChange = catSlug => {
    if (catSlug !== currCat) {
      setCurrPage(1)
      setCurrCat(catSlug)
    }
  }

  const renderTestimonial = () => (
    <li className="relative block w-full overflow-hidden alternativeslider">
      <div className="mx-auto pt-80 pb-80 max-w-1150">
        <div className="relative text-center pb-25 px-30">
          <Quote left className="opacity-25" />
          <Quote right className="opacity-25" />
          <div className="relative mx-auto overflow-hidden w-86 h-86 rounded-5 mb-30">
            <BackgroundImage
              image={
                archiveBlogTestimonial.featuredImage.imageFile.childImageSharp
                  .fluid
              }
              additionalClasses="absolute inset-0 pointer-events-none"
            />
          </div>
          <div
            className="mx-auto mb-20 leading-loose text-blue-500 text-24 max-w-830 font-heading"
            dangerouslySetInnerHTML={{ __html: archiveBlogTestimonial.content }}
          />
          <h3
            className="uppercase text-aqua-500 text-14 font-body tracking-button"
            dangerouslySetInnerHTML={{ __html: archiveBlogTestimonial.title }}
          />
        </div>
      </div>
    </li>
  )

  return (
    <Layout>
      <SEO title="Our Blog" />
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
      <StyledFeaturedPosts className="bg-aqua-200">
        <div className="relative z-10 mx-auto text-center max-w-1460 px-30 pt-90 pb-100">
          <h2 className="font-normal text-32 mb-70">Featured Posts</h2>
          <div className="flex flex-wrap -mx-25">
            {featuredPosts &&
              featuredPosts.map(post => (
                <div className="w-1/2 px-25" key={post.id}>
                  <UniversalLink
                    to={`/news/${post.slug}/`}
                    className="flex flex-col h-full overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none"
                  >
                    <header className="relative h-300 overflow">
                      <BackgroundImage
                        image={
                          post.featuredImage.imageFile.childImageSharp.fluid
                        }
                        additionalClasses="absolute inset-0 pointer-events-none"
                      />
                    </header>
                    <section className="flex flex-col flex-grow pt-40 pb-50 px-45">
                      <p className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
                        Featured
                      </p>
                      <h3
                        className="font-normal mb-15 text-22 leading-body"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      <div
                        className="mx-auto leading-loose text-gray-400 mb-35 text-16 tracking-body max-w-460"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <footer className="mt-auto">
                        <span className="leading-loose uppercase text-aqua-500 text-14 font-body tracking-button link-line-shrink">
                          Read more
                        </span>
                      </footer>
                    </section>
                  </UniversalLink>
                </div>
              ))}
          </div>
        </div>
      </StyledFeaturedPosts>
      <div className="relative">
        <div className="absolute -top-80" ref={postsWrapperRef} />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-1460 px-30 pt-100 pb-120">
          <div className="flex flex-wrap justify-between">
            <div>
              <h3 className="text-gray-300 uppercase mb-7 text-14 tracking-button font-body">
                Category
              </h3>
              <div>
                <button
                  className={`inline-block font-normal leading-loose text-14 font-heading focus:outline-none outline-none ${
                    currCat === `all`
                      ? `link-line-shrink text-aqua-500`
                      : `link-line`
                  }`}
                  type="button"
                  onClick={() => handleCatChange(`all`)}
                >
                  All
                </button>
                {categories &&
                  categories.map(cat => (
                    <button
                      className={`inline-block font-normal leading-loose text-14 font-heading focus:outline-none outline-none ml-45 ${
                        currCat === cat.slug
                          ? `link-line-shrink text-aqua-500`
                          : `link-line`
                      }`}
                      type="button"
                      key={cat.slug}
                      onClick={() => handleCatChange(cat.slug)}
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-gray-300 uppercase text-14 tracking-button font-body">
                Sort
              </h3>
              <Select
                value={currSort}
                onChange={selectedOption => {
                  setCurrSort(selectedOption)
                }}
                options={[
                  { value: `newest`, label: `Newest` },
                  { value: `oldest`, label: `Oldest` },
                ]}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: () => ({
                    width: 300,
                    display: `flex`,
                    borderBottom: `1px solid #708bcc`,
                  }),
                  singleValue: () => ({
                    padding: 0,
                    fontSize: 14,
                    fontFamily: `Libre Baskerville,Georgia,Cambria,Times New Roman,Times,serif`,
                  }),
                  valueContainer: provided => ({
                    ...provided,
                    padding: 0,
                  }),
                  indicatorSeparator: () => ({
                    display: `none`,
                  }),
                }}
              />
            </div>
          </div>
          <ul className="flex flex-wrap -mx-25 pt-50">
            {currPosts.map((post, index) => (
              <>
                <li className="w-1/3 text-center px-25 mb-50" key={post.id}>
                  <UniversalLink
                    to={`/news/${post.slug}/`}
                    className="flex flex-col h-full overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none"
                  >
                    <header className="relative h-220 overflow">
                      <BackgroundImage
                        image={
                          post.featuredImage.imageFile.childImageSharp.fluid
                        }
                        additionalClasses="absolute inset-0 pointer-events-none"
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
                {index === 5 && renderTestimonial()}
              </>
            ))}
          </ul>
          <Pagination
            locale={{
              items_per_page: `/ page`,
              jump_to: `Go to`,
              jump_to_confirm: `confirm`,
              page: ``,
              prev_page: `Previous Page`,
              next_page: `Next Page`,
              prev_5: `Previous 5 Pages`,
              next_5: `Next 5 Pages`,
              prev_3: `Previous 3 Pages`,
              next_3: `Next 3 Pages`,
            }}
            defaultPageSize={12}
            current={currPage}
            onChange={onPaginationChange}
            total={currPostsLength}
          />
        </div>
      </div>
    </Layout>
  )
}

export default NewsPage
