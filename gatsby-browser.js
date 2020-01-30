import './src/styles/typekit.scss'
import './src/styles/global.scss'
import './src/styles/tailwind.scss'
import 'typeface-libre-baskerville'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import { client } from './src/apollo/client'

export const replaceHydrateFunction = () => (element, container, callback) => {
  loadableReady(() => {
    hydrate(element, container, callback)
  })
}

export const onClientEntry = () => {
  if (typeof window.IntersectionObserver === `undefined`) {
    require(`intersection-observer`)
  }
}

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
