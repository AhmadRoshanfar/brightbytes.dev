import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { Search, ArrowUpRight } from "lucide-react";
import Layout from "../components/layout/layout";
import { SEO } from "../components/seo";
import { postPath } from "../lib/content.cjs";
export default function SearchPage({ data }) {
  const [query, setQuery] = useState("");
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  // Search stays entirely in the browser; no queries are sent to Analytics.
  const results = data.allMdx.nodes.filter(({ frontmatter: p, excerpt }) => {
    const text =
      `${p.title} ${p.description || excerpt} ${(p.tags || []).join(" ")}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
  return (
    <Layout>
      <section className="page-intro narrow">
        <p className="eyebrow">FIND YOUR NEXT DISCOVERY</p>
        <h1>Search the notebook.</h1>
        <p>Look up a topic, a tool, or something you want to build.</p>
      </section>
      <div className="search-content">
        <label className="search-label" htmlFor="article-search">
          Search articles
        </label>
        <div className="search-field">
          <Search size={22} />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Linux, Flutter, or e-paper…"
            autoComplete="off"
          />
        </div>
        <p className="search-count" role="status">
          {results.length} {results.length === 1 ? "article" : "articles"}
          {query.trim() ? " found" : " to explore"}
        </p>
        <div className="search-results">
          {results.map(({ id, frontmatter: p, excerpt, fields }) => (
            <article key={id}>
              <Link to={postPath(p.slug)}>
                <div className="card-category">
                  {(p.tags || []).join(" / ")}
                </div>
                <h2>
                  {p.title} <ArrowUpRight size={20} />
                </h2>
                <p>{p.description || excerpt}</p>
                <span className="card-meta">
                  {p.date} · {fields.readingMinutes} min read
                </span>
              </Link>
            </article>
          ))}
        </div>
        {!results.length && (
          <div className="empty-state">
            <h2>No notes found yet.</h2>
            <p>Try a shorter phrase or a different topic.</p>
            <button className="button secondary" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
export const query = graphql`
  query SearchArticles {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        excerpt(pruneLength: 180)
        fields {
          readingMinutes
        }
        frontmatter {
          title
          slug
          description
          tags
          date(formatString: "MMM D, YYYY")
        }
      }
    }
  }
`;
export const Head = () => (
  <SEO title="Search articles" pathname="/search/" noindex />
);
