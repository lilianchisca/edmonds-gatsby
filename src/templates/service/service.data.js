const ServiceTemplateFragment = `
  fragment ServiceTemplateFragment on WPGraphQL_Service {
    id
    title
    content
    uri
    serviceSettings {
      sidebarTitle
      sidebarLinks {
        link {
          target
          title
          url
        }
      }
    }
  }
`

module.exports.ServiceTemplateFragment = ServiceTemplateFragment
