module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_HeroSection {
    fieldGroupName
    title
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
    backgroundImage {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
