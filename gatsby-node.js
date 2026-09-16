const path = require("path");
const fs = require("fs/promises");
const site = require("./config");
const {
  postPath,
  tagPath,
  escapeXml,
  readingMinutes,
  validatePosts,
} = require("./src/lib/content.cjs");

exports.createSchemaCustomization = ({ actions }) =>
  actions.createTypes(`
  type Mdx implements Node { frontmatter: MdxFrontmatter! fields: MdxFields! }
  type MdxFrontmatter { title: String! slug: String! date: Date! @dateformat updated: Date @dateformat description: String tags: [String!] featuredImage: File @fileByRelativePath featuredImageAlt: String }
  type MdxFields { readingMinutes: Int! }
`);
exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "Mdx")
    actions.createNodeField({
      node,
      name: "readingMinutes",
      value: readingMinutes(node.body),
    });
};
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            title
            slug
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  `);
  if (result.errors)
    return reporter.panicOnBuild("Unable to load articles", result.errors);
  const posts = result.data.allMdx.nodes;
  try {
    validatePosts(posts);
  } catch (error) {
    return reporter.panicOnBuild(error.message);
  }
  const limit = 6;
  const numPages = Math.max(1, Math.ceil(posts.length / limit));
  for (let i = 0; i < numPages; i++)
    actions.createPage({
      path: i === 0 ? "/blog/" : `/blog/${i + 1}/`,
      component: path.resolve("src/templates/blogTemplate.js"),
      context: { limit, skip: i * limit, currentPage: i + 1, numPages },
    });
  for (const tag of new Set(
    posts.flatMap((post) => post.frontmatter.tags || []),
  ))
    actions.createPage({
      path: tagPath(tag),
      component: path.resolve("src/templates/tagsTemplate.js"),
      context: { tag },
    });
};
exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    {
      allSitePage {
        nodes {
          path
        }
      }
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          excerpt(pruneLength: 180)
          fields {
            readingMinutes
          }
          frontmatter {
            title
            slug
            description
            tags
            date(formatString: "YYYY-MM-DD")
            updated(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `);
  if (result.errors)
    return reporter.panicOnBuild("Unable to generate feeds", result.errors);
  const posts = result.data.allMdx.nodes;
  const canonical = (route) => new URL(route, site.siteUrl).href;
  const dates = new Map(
    posts.map((p) => [
      postPath(p.frontmatter.slug),
      p.frontmatter.updated || p.frontmatter.date,
    ]),
  );
  const urls = result.data.allSitePage.nodes
    .filter((p) => !/404|dev-404|offline-plugin|^\/search\//.test(p.path))
    .map(
      (p) =>
        `<url><loc>${escapeXml(canonical(p.path))}</loc>${dates.has(p.path) ? `<lastmod>${dates.get(p.path)}</lastmod>` : ""}</url>`,
    )
    .join("");
  const items = posts
    .map(
      ({ frontmatter: p, excerpt }) =>
        `<item><title>${escapeXml(p.title)}</title><link>${canonical(postPath(p.slug))}</link><guid isPermaLink="true">${canonical(postPath(p.slug))}</guid><description>${escapeXml(p.description || excerpt)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate>${(p.tags || []).map((t) => `<category>${escapeXml(t)}</category>`).join("")}</item>`,
    )
    .join("");
  await Promise.all([
    fs.writeFile(
      "public/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    ),
    fs.writeFile(
      "public/rss.xml",
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${site.title}</title><link>${site.siteUrl}</link><description>${escapeXml(site.description)}</description><language>en</language><atom:link href="${site.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    ),
    fs.writeFile(
      "public/robots.txt",
      `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`,
    ),
  ]);
};
