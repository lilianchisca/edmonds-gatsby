module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_Testimonials {
    fieldGroupName
    testimonials {
      testimonial {
        ... on WPGraphQL_Testimonial {
          id
          title
          content
        }
      }
    }
  }
`
