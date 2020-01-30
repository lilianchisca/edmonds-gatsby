const path = require(`path`)

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: '${activeEnv}'`)

require(`dotenv`).config({
  path: `.env.${activeEnv}`,
})

console.log(
  `This WordPress Endpoint is used: 'https://edmondsaccountancy.kinsta.cloud'`
)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-transition-link`,
      options: {
        injectPageProps: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
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
    // {
    //   resolve: `gatsby-source-gravityforms`,
    //   options: {
    //     baseUrl: `http://edmonds.local`,
    //     api: {
    //       key: `ck_84e457df9d648a3cdc1cfa76616d822848f8a742`,
    //       secret: `cs_bf83318787f5f44632e9a06c48c6502be26bc073`,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-source-gravityforms`,
      options: {
        baseUrl: `https://edmondsaccountancy.kinsta.cloud`,
        api: {
          key: `ck_dcb2056dd47e24d25fe0febc3e38ae2ebac9abc5`,
          secret: `cs_1acd0184ab029b2eae252e94533997e721a7960d`,
        },
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `https://edmondsaccountancy.kinsta.cloud/graphql`,
      },
    },
    {
      resolve: `gatsby-wpgraphql-inline-images`,
      options: {
        wordPressUrl: `https://edmondsaccountancy.kinsta.cloud/`,
        uploadsUrl: `https://edmondsaccountancy.kinsta.cloud/wp-content/uploads/`,
        processPostTypes: [`Page`, `Post`, `Service`],
        graphqlTypeName: `WPGraphQL`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [`Access-Control-Allow-Origin: *`],
        },
      },
    },
  ],
}
