/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  proxy: {
    prefix: "/api",
    url: "http://localhost:5001",
  },
  plugins: [],
}
