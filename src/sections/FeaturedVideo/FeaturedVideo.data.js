module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_FeaturedVideo {
    fieldGroupName
    title
    button {
      url
      title
      target
    }
    videoLink
    videoThumbnail {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 1600, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    content
  }
`
