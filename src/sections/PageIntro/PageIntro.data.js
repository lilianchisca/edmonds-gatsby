module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_PageIntro {
    fieldGroupName
    title
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
