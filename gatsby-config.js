const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: '${activeEnv}'`)

require(`dotenv`).config({
  path: `.env.${activeEnv}`,
})

console.log(`This WordPress Endpoint is used: 'http://edmondswp.mydevenv.co'`)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./src/styles/tailwind.config.js`),
          require(`autoprefixer`),
          require(`cssnano`),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/tailwind.scss`],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `http://edmondswp.mydevenv.co/graphql`,
      },
    },
    {
      resolve: `gatsby-wpgraphql-inline-images`,
      options: {
        wordPressUrl: `http://edmondswp.mydevenv.co/`,
        uploadsUrl: `http://edmondswp.mydevenv.co/wp-content/uploads/`,
        processPostTypes: [`Page`, `Post`],
        graphqlTypeName: `WPGraphQL`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
