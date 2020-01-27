module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_TestimonialsSlider {
    fieldGroupName
    alternativeStyle
    betweenSectionsStyle
    testimonials {
      testimonial {
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
`
