module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_TeamMembers {
    fieldGroupName
    pretitle
    title
    members {
      name
      title
      image {
        sourceUrl
        altText
        mediaItemId
        modified
        imageFile {
          childImageSharp {
            fluid(maxWidth: 620, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
