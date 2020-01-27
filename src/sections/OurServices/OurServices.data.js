module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_OurServices {
    fieldGroupName
    title
    image {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 1100, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    services {
      service {
        url
        title
        target
      }
    }
    calloutTitle
    calloutLink {
      url
      title
      target
    }
  }
`
