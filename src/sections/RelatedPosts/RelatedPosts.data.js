module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_RelatedPosts {
    fieldGroupName
    pretitle
    title
    relatedPosts {
      post {
        ... on WPGraphQL_Post {
          id
          date
          title
          slug
          featuredImage {
            sourceUrl
            altText
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 860, quality: 100) {
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
