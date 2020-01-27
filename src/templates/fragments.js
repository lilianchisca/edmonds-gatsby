const FluidImageFragment = `
  fragment GatsbyImageSharpFluid_withWebp on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`

module.exports.FluidImageFragment = FluidImageFragment

const FixedImageFragment = `
  fragment GatsbyImageSharpFixed on ImageSharpFixed {
    base64
    width
    height
    src
    srcSet
  }
`

module.exports.FixedImageFragment = FixedImageFragment
