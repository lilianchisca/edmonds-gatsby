const { readFileSync, existsSync } = require(`fs`)
const { ChunkExtractor } = require(`@loadable/server`)
const { statsPath } = require(`./gatsby/constants`)

const extractor = new ChunkExtractor({
  // Read the stats file generated by webpack loadable plugin.
  // The file will not exist in develop stages.
  stats: existsSync(statsPath)
    ? JSON.parse(readFileSync(statsPath, `utf8`))
    : {},
  entrypoints: [],
})

// extractor.collectChunks() will wrap the application in a ChunkExtractorManager
exports.wrapRootElement = ({ element }) => extractor.collectChunks(element)

exports.onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
  // Set link rel="preload" tags in the head to start the request asap. This will NOT parse the assets fetched
  setHeadComponents(extractor.getLinkElements())

  // Set script and style tags at the end of the document to parse the assets.
  setPostBodyComponents([
    ...extractor.getScriptElements(),
    ...extractor.getStyleElements(),
  ])

  // Reset collected chunks after each page is rendered
  extractor.chunks = []
}

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const components = getHeadComponents()

  components.forEach(component => {
    if (
      component.type === `link` &&
      component.props &&
      component.props.rel === `preload`
    ) {
      component.props.crossorigin = ``
    }
  })

  // WARNING: if multiple plugins implement this API it’s the last plugin that “wins”.
  // See https://www.gatsbyjs.org/docs/ssr-apis/
  replaceHeadComponents(components)
}
