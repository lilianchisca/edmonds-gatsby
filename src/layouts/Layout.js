import React from 'react'
import { oneOfType, arrayOf, node } from 'prop-types'

import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
}

export default Layout
