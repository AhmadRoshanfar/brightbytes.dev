const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  validatePosts,
  escapeXml,
  readingMinutes,
} = require("../src/lib/content.cjs");
const { createPages } = require("../gatsby-node");
const post = (slug = "first-post", extra = {}) => ({
  frontmatter: {
    title: "A useful note",
    slug,
    date: "2026-09-16",
    tags: ["Embedded Linux"],
    ...extra,
  },
});
test("rejects duplicate slugs, impossible dates, and conflicting tag URLs", () => {
  assert.throws(() => validatePosts([post(), post()]), /duplicate/);
  assert.throws(
    () => validatePosts([post("bad-date", { date: "2026-02-30" })]),
    /Invalid date/,
  );
  assert.throws(
    () =>
      validatePosts([post("a", { tags: ["C++"] }), post("b", { tags: ["C"] })]),
    /Conflicting/,
  );
  assert.doesNotThrow(() => validatePosts([post()]));
  assert.doesNotThrow(() => validatePosts([post("without-tags", {tags: null})]));
});
test("reading time accounts for code-heavy tutorials", () => {
  assert.equal(readingMinutes(""), 1);
  assert.equal(readingMinutes("word ".repeat(400)), 2);
  assert.ok(
    readingMinutes("<CodeViewer code={`" + "command ".repeat(350) + "`}/>") >=
      4,
  );
});
test("feed text is escaped as XML", () => {
  assert.equal(
    escapeXml('A & B <tag> "quote"'),
    "A &amp; B &lt;tag&gt; &quot;quote&quot;",
  );
});
test("archives paginate without dropping posts or duplicating tag pages", async () => {
  const pages = [];
  await createPages({
    actions: { createPage: (page) => pages.push(page) },
    graphql: async () => ({
      data: {
        allMdx: {
          nodes: Array.from({ length: 14 }, (_, i) => post(`post-${i}`)),
        },
      },
    }),
    reporter: {
      panicOnBuild: (message) => {
        throw Error(message);
      },
    },
  });
  assert.deepEqual(
    pages
      .filter((p) => p.path.startsWith("/blog/"))
      .map((p) => [p.path, p.context.skip, p.context.limit]),
    [
      ["/blog/", 0, 6],
      ["/blog/2/", 6, 6],
      ["/blog/3/", 12, 6],
    ],
  );
  assert.equal(
    pages.filter((p) => p.path === "/tags/embedded-linux/").length,
    1,
  );
});
test("an empty blog still has a valid archive page", async () => {
  const pages = [];
  await createPages({
    actions: { createPage: (p) => pages.push(p) },
    graphql: async () => ({ data: { allMdx: { nodes: [] } } }),
    reporter: {
      panicOnBuild: (message) => {
        throw Error(message);
      },
    },
  });
  assert.equal(pages[0].path, "/blog/");
  assert.equal(pages[0].context.numPages, 1);
});
