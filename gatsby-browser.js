require(`./src/styles/typekit.scss`)
require(`./src/styles/global.scss`)
require(`./src/styles/tailwind.scss`)
require(`typeface-libre-baskerville`)

const { hydrate } = require(`react-dom`)
const { loadableReady } = require(`@loadable/component`)

exports.replaceHydrateFunction = () => (element, container, callback) => {
  loadableReady(() => {
    hydrate(element, container, callback)
  })
}

exports.onClientEntry = () => {
  if (typeof window.IntersectionObserver === `undefined`) {
    require(`intersection-observer`)
  }
}
