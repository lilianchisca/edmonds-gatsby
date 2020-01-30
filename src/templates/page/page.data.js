const PageTemplateFragment = layouts => `
  fragment PageTemplateFragment on WPGraphQL_Page {
    id
    title
    pageId
    content
    uri
    isFrontPage
    builder {
      sections {
        ${layouts}
      }
    }
    seo {
      title
      metaDesc
    }
  }
`

module.exports.PageTemplateFragment = PageTemplateFragment
