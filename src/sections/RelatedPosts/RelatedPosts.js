import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import moment from 'moment/moment'

import BackgroundImage from '../../components/BackgroundImage'
import UniversalLink from '../../components/UniversalLink'

const RelatedPosts = ({ sectionIndex, pretitle, title, relatedPosts }) => (
  <section data-section-index={sectionIndex}>
    <div className="bg-aqua-200 pt-130 pb-120">
      <div className="mx-auto text-center max-w-1460 px-30">
        <h3 className="mb-20 text-gray-300 uppercase text-14 font-body tracking-button">
          {pretitle}
        </h3>
        <h2 className="font-normal text-27 leading-body">{title}</h2>

        <ul className="flex flex-wrap pt-70 -mx-25">
          {relatedPosts.map(({ post }) => (
            <li className="w-1/3 px-25" key={post.id}>
              <UniversalLink
                to={`/news/${post.slug}/`}
                className="flex flex-col h-full overflow-hidden bg-white border border-transparent rounded-5 shadow-box transition-all duration-300 hover:border-gray-200 hover:shadow-none"
              >
                <header className="relative h-220 overflow">
                  <BackgroundImage
                    image={post.featuredImage.imageFile.childImageSharp.fluid}
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
          ))}
        </ul>
      </div>
    </div>
  </section>
)

RelatedPosts.propTypes = {
  sectionIndex: string,
  pretitle: string.isRequired,
  title: string.isRequired,
  relatedPosts: arrayOf(
    shape({
      post: shape({
        id: string.isRequired,
        date: string.isRequired,
        title: string.isRequired,
        slug: string.isRequired,
        featuredImage: shape({
          imageFile: shape({
            childImageSharp: shape({
              fluid: shape({
                base64: string,
                src: string,
                srcSet: string,
                srcWebp: string,
                srcSetWebp: string,
                sizes: string,
              }),
            }),
          }),
        }).isRequired,
      }),
    })
  ),
}

export default RelatedPosts
