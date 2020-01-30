const ServiceTemplateFragment = `
  fragment ServiceTemplateFragment on WPGraphQL_Service {
    id
    title
    content
    uri
    serviceTags {
      edges {
        node {
          name
          services {
            nodes {
              title
              uri
            }
          }
        }
      }
    }
    seo {
      title
      metaDesc
    }
  }
`

module.exports.ServiceTemplateFragment = ServiceTemplateFragment
