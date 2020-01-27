module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_FeaturedServices {
    fieldGroupName
    alternativeStyle
    title
    services {
      title
      items {
        title
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
      link {
        url
        title
        target
      }
    }
    content
    button {
      url
      title
      target
    }
    bottomLogos {
      logo {
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
            fluid(maxWidth: 240, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
