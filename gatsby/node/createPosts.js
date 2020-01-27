const { FluidImageFragment } = require(`../../src/templates/fragments.js`)
const {
  PostTemplateFragment,
} = require(`../../src/templates/post/post.data.js`)
const postTemplate = require.resolve(
  `../../src/templates/post/post.template.js`
)

const GET_POSTS = `
  ${FluidImageFragment}
  ${PostTemplateFragment}

  query GET_POSTS($first:Int $after:String) {
    wpgraphql {
      posts(
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
          ...PostTemplateFragment
        }
      }
    }
  }
`

const allPosts = []
let pageNumber = 0
const itemsPerPage = 10

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const fetchPosts = async variables =>
    graphql(GET_POSTS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      if (nodes) {
        nodes.map(post => allPosts.push(post))
      }

      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch page ${pageNumber} of posts...`)
        return fetchPosts({ first: itemsPerPage, after: endCursor })
      }

      return allPosts
    })

  await fetchPosts({ first: itemsPerPage, after: null }).then(wpPosts => {
    if (wpPosts) {
      wpPosts.forEach(post => {
        const postPath = `/news/${post.uri}`
        const category = post.categories
          ? post.categories.nodes.filter(({ name }) => name !== `Featured`)[0]
              .name
          : ``

        createPage({
          path: postPath,
          component: postTemplate,
          context: {
            post,
            category,
          },
        })

        reporter.info(`post created:  ${post.uri}`)
      })

      reporter.info(`# -----> POSTS TOTAL: ${wpPosts.length}`)
    }
  })
}
