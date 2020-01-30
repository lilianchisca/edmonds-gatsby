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
    seo {
      title
      metaDesc
    }
  }
`

const PostPreviewQuery = `
  query getPreview($id: Int!, $category: String!) {
    postBy(postId: $id) {
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
      seo {
        title
        metaDesc
      }
    }
    posts(where: { categoryName: $category }, first: 4) {
      edges {
        node {
          id
          slug
          date
          title
          featuredImage {
            sourceUrl
            altText
            mediaItemId
            modified
          }
        }
      }
    }
    themeOptions {
      themeOptions {
        singleBlogCalloutLink {
          target
          title
          url
        }
        singleBlogCalloutTitle
      }
    }
  }
`

module.exports.PostTemplateFragment = PostTemplateFragment
module.exports.PostPreviewQuery = PostPreviewQuery
