module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_FeaturedContent {
    fieldGroupName
    title
    content
    image1 {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    image2 {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 700, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    button1 {
      url
      title
      target
    }
    button2 {
      url
      title
      target
    }
  }
`
