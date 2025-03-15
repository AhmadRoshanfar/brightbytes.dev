/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = require("./config");

module.exports = {
  // pathPrefix: "/brightbytes.dev",
  siteMetadata: {
    title: `BrightBytes.dev`,
    siteUrl: "https://brightbytes.dev",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        "icon": "src/images/logo.png"
      },
    },
    
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Jersey 25`
        ],
        display: "swap",
      },
    },
  ],
};

