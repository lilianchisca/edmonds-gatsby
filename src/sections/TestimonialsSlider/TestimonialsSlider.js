import React from 'react'
import { bool, string, shape, arrayOf } from 'prop-types'
import Slider from 'react-slick'
import styled from 'styled-components'

import BackgroundImage from '../../components/BackgroundImage'

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

const AltBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  img {
    bottom: -161px;
    width: 2109px;
    max-width: 2109px;
    height: 467px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`

const TestimonialsSlider = ({
  sectionIndex,
  alternativeStyle,
  betweenSectionsStyle,
  testimonials,
}) => {
  const sliderSettings = {
    arrows: false,
    dots: true,
    draggable: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 600,
  }

  return (
    <section data-section-index={sectionIndex}>
      <div
        className={`relative ${
          alternativeStyle ? `bg-aqua-200 pt-45 pb-35` : ``
        }`}
      >
        {alternativeStyle && (
          <AltBg>
            <img src="/images/testbg.png" alt="background pattern" />
          </AltBg>
        )}
        {betweenSectionsStyle === `top_aqua_bottom_white_lines` && (
          <>
            <div className="absolute inset-x-0 top-0 bg-aqua-200 bottom-50p" />
            <div className="absolute inset-x-0 bottom-0 top-50p">
              <div className="h-full mx-auto max-w-1460 px-30">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/5 h-full border-l border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {betweenSectionsStyle === `top_white_lines_bottom_aqua` && (
          <>
            <div className="absolute inset-x-0 bottom-0 top-50p bg-aqua-200" />
            <div className="absolute inset-x-0 top-0 bottom-50p">
              <div className="h-full mx-auto max-w-1460 px-30">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/5 h-full border-l border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                    <div className="w-1/5 h-full border-r border-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {betweenSectionsStyle === `top_white_bottom_aqua` && (
          <>
            <div className="absolute inset-x-0 top-0 bg-white bottom-50p" />
            <div className="absolute inset-x-0 bottom-0 bg-aqua-200 top-50p" />
          </>
        )}

        {alternativeStyle ? (
          <div className="relative mx-auto overflow-hidden max-w-1150 alternativeslider">
            <div className="pt-60 pb-80">
              <Slider {...sliderSettings}>
                {testimonials.map(({ testimonial }) => (
                  <div
                    key={testimonial.id}
                    className="relative text-center pb-25 px-30"
                  >
                    <Quote left className="opacity-25" />
                    <Quote right className="opacity-25" />
                    <div className="relative mx-auto overflow-hidden w-86 h-86 rounded-5 mb-30">
                      <BackgroundImage
                        image={
                          testimonial.featuredImage.imageFile.childImageSharp
                            .fluid
                        }
                        additionalClasses="absolute inset-0 pointer-events-none"
                      />
                    </div>
                    <div
                      className="mx-auto mb-20 leading-loose text-blue-500 text-24 max-w-830 font-heading"
                      dangerouslySetInnerHTML={{ __html: testimonial.content }}
                    />
                    <h3
                      className="uppercase text-aqua-500 text-14 font-body tracking-button"
                      dangerouslySetInnerHTML={{ __html: testimonial.title }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto overflow-hidden max-w-1150 rounded-5 shadow-box">
            <div className="bg-blue-500 border-yellow-500 border-t-5 pt-60 pb-80">
              <Slider {...sliderSettings}>
                {testimonials.map(({ testimonial }) => (
                  <div
                    key={testimonial.id}
                    className="relative text-center pb-25 px-30"
                  >
                    <Quote left />
                    <Quote right />
                    <div className="relative mx-auto overflow-hidden w-86 h-86 rounded-5 mb-30">
                      <BackgroundImage
                        image={
                          testimonial.featuredImage.imageFile.childImageSharp
                            .fluid
                        }
                        additionalClasses="absolute inset-0 pointer-events-none"
                      />
                    </div>
                    <div
                      className="mx-auto mb-20 leading-loose text-white text-24 max-w-830 font-heading"
                      dangerouslySetInnerHTML={{ __html: testimonial.content }}
                    />
                    <h3
                      className="uppercase text-aqua-500 text-14 font-body tracking-button"
                      dangerouslySetInnerHTML={{ __html: testimonial.title }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

TestimonialsSlider.propTypes = {
  sectionIndex: string,
  alternativeStyle: bool,
  betweenSectionsStyle: string,
  testimonials: arrayOf(
    shape({
      testimonial: shape({
        id: string.isRequired,
        title: string.isRequired,
        content: string.isRequired,
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

export default TestimonialsSlider
