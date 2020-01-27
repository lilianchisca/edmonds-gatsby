const { unlinkSync } = require(`fs`)
const LoadablePlugin = require(`@loadable/webpack-plugin`)
const { statsFilename, statsPath } = require(`./gatsby/constants`)
const createPages = require(`./gatsby/node/createPages`)
const createPosts = require(`./gatsby/node/createPosts`)

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  if (stage === `build-javascript`) {
    actions.setWebpackConfig({
      plugins: [new LoadablePlugin({ filename: statsFilename })],
    })
  }

  const config = getConfig()
  config.node = {
    fs: `empty`,
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: `@loadable/babel-plugin` })
}

exports.onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath)
}

exports.createResolvers = require(`./gatsby/node/createResolvers`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPages({ actions, graphql, reporter })
  await createPosts({ actions, graphql, reporter })
}
