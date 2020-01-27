import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import styled from 'styled-components'

const Quote = styled.div`
  width: 44px;
  height: 36px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  background: url('/images/quoteleft.png') no-repeat center / 100% 100%;
`

const Testimonials = ({ sectionIndex, testimonials }) => (
  <section data-section-index={sectionIndex}>
    <div className="text-center bg-white pt-130 pb-30">
      <div className="mx-auto max-w-1460 px-30">
        <ul className="flex flex-wrap">
          {testimonials.map(({ testimonial }, index) => (
            <li
              className={`w-1/2 px-55 odd:border-r border-gray-200 ${
                index > 1 ? `border-t pt-90 pb-35` : `pt-35 pb-90`
              }`}
              key={testimonial.id}
            >
              <Quote className="opacity-25" />
              <div
                className="mb-20 leading-loose text-blue-500 text-24 max-w-830 font-heading"
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />
              <h2 className="uppercase text-aqua-500 text-14 font-body tracking-button">
                {testimonial.title}
              </h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

Testimonials.propTypes = {
  sectionIndex: string,
  testimonials: arrayOf(
    shape({
      testimonial: shape({
        id: string.isRequired,
        title: string.isRequired,
        content: string.isRequired,
      }),
    })
  ),
}

export default Testimonials
