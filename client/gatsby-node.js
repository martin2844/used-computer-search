// gatsby-node.js
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
const path = require("path");
exports.onCreatePage = async ({page, actions}) => {
    const {createPage} = actions
  
    if (page.path.match(/^\/difference/)) {
      await createPage({
        path: '/differences',
        matchPath: '/difference/*',
        component: path.resolve(`src/pages/difference.js`),
      })
    }
  }