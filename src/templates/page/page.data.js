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
  }
`

module.exports.PageTemplateFragment = PageTemplateFragment
