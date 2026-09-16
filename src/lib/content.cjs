const kebabCase = require("lodash/kebabCase");
const postPath = (slug) => `/blog/${slug}/`;
const tagPath = (tag) => `/tags/${kebabCase(tag)}/`;
const escapeXml = (value) =>
  String(value ?? "").replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
function readingMinutes(body = "") {
  // Code-heavy tutorials take longer to read than ordinary prose.
  let code = "";
  const prose = body
    .replace(/code=\{`([\s\S]*?)`\}/g, (_, block) => {
      code += " " + block;
      return "";
    })
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, block) => {
      code += " " + block;
      return "";
    })
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, " ");
  const words = (text) => text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words(prose) / 200 + words(code) / 100));
}
function validatePosts(posts) {
  const slugs = new Set();
  const tagSlugs = new Map();
  for (const post of posts) {
    const { title, slug, date, tags = [] } = post.frontmatter;
    if (
      !title?.trim() ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || "") ||
      slugs.has(slug)
    )
      throw new Error(`Invalid title or duplicate/invalid slug: ${slug}`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date || "") ||
      Number.isNaN(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date
    )
      throw new Error(`Invalid date in ${slug}`);
    slugs.add(slug);
    for (const tag of tags || []) {
      const key = kebabCase(tag);
      if (!key || (tagSlugs.has(key) && tagSlugs.get(key) !== tag))
        throw new Error(`Conflicting or empty tag: ${tag}`);
      tagSlugs.set(key, tag);
    }
  }
}
module.exports = {
  postPath,
  tagPath,
  escapeXml,
  readingMinutes,
  validatePosts,
};
