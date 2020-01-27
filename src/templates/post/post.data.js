const PostTemplateFragment = `
  fragment PostTemplateFragment on WPGraphQL_Post {
    id
    date
    postId
    title
    content
    link
    uri
    slug
    featuredImage {
      sourceUrl
      altText
      mediaItemId
      modified
      imageFile {
        childImageSharp {
          fluid(maxWidth: 1600, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    categories {
      nodes {
        name
        slug
        id
      }
    }
    author {
      name
    }
  }
`

module.exports.PostTemplateFragment = PostTemplateFragment
