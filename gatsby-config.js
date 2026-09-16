require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const site = require("./config");
module.exports = {
  siteMetadata: site,
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: { remarkPlugins: [require("./plugins/remark-headings")] },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: site.title,
        short_name: "BrightBytes",
        start_url: "/",
        display: "minimal-ui",
        background_color: "#faf9f6",
        theme_color: "#0f766e",
        icon: "static/brand-mark.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "blog", path: `${__dirname}/src/blog` },
    },
  ],
};
