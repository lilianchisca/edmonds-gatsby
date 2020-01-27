module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_FeaturedBlocks {
    fieldGroupName
    pretitle
    title
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
          fluid(maxWidth: 620, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    blocks {
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
            fluid(maxWidth: 150, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
