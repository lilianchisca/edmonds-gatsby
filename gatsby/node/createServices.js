const {
  ServiceTemplateFragment,
} = require(`../../src/templates/service/service.data.js`)
const serviceTemplate = require.resolve(
  `../../src/templates/service/service.template.js`
)

const GET_SERVICES = `
  ${ServiceTemplateFragment}

  query GET_SERVICES($first:Int $after:String) {
    wpgraphql {
      services(
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
          ...ServiceTemplateFragment
        }
      }
    }
  }
`

const allServices = []
let pageNumber = 0
const itemsPerPage = 10

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const fetchServices = async variables =>
    graphql(GET_SERVICES, variables).then(({ data }) => {
      const {
        wpgraphql: {
          services: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      if (nodes) {
        nodes.map(service => allServices.push(service))
      }

      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch page ${pageNumber} of posts...`)
        return fetchServices({ first: itemsPerPage, after: endCursor })
      }

      return allServices
    })

  await fetchServices({ first: itemsPerPage, after: null }).then(wpServices => {
    if (wpServices) {
      wpServices.forEach(service => {
        const servicePath = `/${service.uri}`

        createPage({
          path: servicePath,
          component: serviceTemplate,
          context: {
            service,
          },
        })

        reporter.info(`service created:  ${service.uri}`)
      })

      reporter.info(`# -----> SERVICES TOTAL: ${wpServices.length}`)
    }
  })
}
