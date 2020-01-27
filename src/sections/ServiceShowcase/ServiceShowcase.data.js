module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_ServiceShowcase {
    fieldGroupName
    title
    content
    services {
      title
      description
      icon {
        sourceUrl
        altText
        mediaItemId
        mediaDetails {
          width
          height
        }
        modified
        imageFile {
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    button1 {
      url
      target
      title
    }
    button2 {
      url
      target
      title
    }
  }
`
