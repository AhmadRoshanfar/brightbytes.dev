import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/layout";
import { SEO } from "../components/seo";
export default function NotFound() {
  return (
    <Layout>
      <section className="page-intro not-found">
        <p className="eyebrow">404 / A SMALL DETOUR</p>
        <h1>This trail ends here.</h1>
        <p>The page may have moved, but there’s plenty more to explore.</p>
        <div className="button-row">
          <Link className="button" to="/blog/">
            Browse the notes →
          </Link>
          <Link className="button secondary" to="/search/">
            Search articles
          </Link>
        </div>
      </section>
    </Layout>
  );
}
export const Head = () => (
  <SEO title="Page not found" pathname="/404/" noindex />
);
