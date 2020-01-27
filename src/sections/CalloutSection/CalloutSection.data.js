module.exports = () => `
  ... on WPGraphQL_Page_Builder_Sections_CalloutSection {
    fieldGroupName
    pretitle
    title
    content
    button {
      url
      title
      target
    }
  }
`
