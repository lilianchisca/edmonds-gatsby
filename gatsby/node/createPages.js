const { FluidImageFragment } = require(`../../src/templates/fragments.js`)
const {
  PageTemplateFragment,
} = require(`../../src/templates/page/page.data.js`)
const getAllSectionsData = require(`../../src/sections/getAllSectionsData.js`)
const pageTemplate = require.resolve(
  `../../src/templates/page/page.template.js`
)

const GET_PAGES = layouts => `
  ${FluidImageFragment}
  ${PageTemplateFragment(layouts)}

  query GET_PAGES($first:Int $after:String) {
    wpgraphql {
      pages(
        first: $first
        after: $after
        # This will make sure to only get the parent nodes and no children
        where: {
          parent: null
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...PageTemplateFragment
        }
      }
    }
  }
`

const allPages = []
let pageNumber = 0
const itemsPerPage = 10

module.exports = async ({ actions, graphql, reporter }) => {
  const layoutsData = getAllSectionsData()
  const { createPage } = actions

  const fetchPages = async variables =>
    graphql(GET_PAGES(layoutsData), variables).then(({ data }) => {
      const {
        wpgraphql: {
          pages: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      if (nodes) {
        nodes.map(page => allPages.push(page))
      }

      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch page ${pageNumber} of pages...`)
        return fetchPages({ first: itemsPerPage, after: endCursor })
      }

      return allPages
    })

  await fetchPages({ first: itemsPerPage, after: null }).then(wpPages => {
    if (wpPages) {
      wpPages.forEach(page => {
        let pagePath = `/${page.uri}`

        if (page.isFrontPage) {
          pagePath = `/`
        }

        createPage({
          path: pagePath,
          component: pageTemplate,
          context: {
            page,
          },
        })

        reporter.info(`page created:  ${page.uri}`)
      })

      reporter.info(`# -----> PAGES TOTAL: ${wpPages.length}`)
    }
  })
}
