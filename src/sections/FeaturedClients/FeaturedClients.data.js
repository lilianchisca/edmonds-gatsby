module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_FeaturedClients {
    fieldGroupName
    title
    clients {
      logo {
        sourceUrl
        altText
        mediaItemId
        modified
        imageFile {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
