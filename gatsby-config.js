/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-styled-components`,
    `babel-plugin-styled-components`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `movies1`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-notion-api`,
      options: {
        // token: `$INTEGRATION_TOKEN`,
        // databaseId: `$DATABASE_ID`,
        token: `secret_BIwWWzzjMuWddXGUbODp6qMm7Zy8E6hMTqWe3hCFE7C`,
        databaseId: `dc0ccb9b5767483e9fe411acb20abefa`,
      },
    },
  ],
}
