import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout/layout";
import PostCard from "../components/postCard";
import Category from "../components/category";
import { SEO } from "../components/seo";
const pagePath = (n) => (n === 1 ? "/blog/" : `/blog/${n}/`);
export default function BlogList({
  data,
  pageContext: { currentPage, numPages },
}) {
  return (
    <Layout>
      <section className="page-intro enter">
        <p className="eyebrow">THE NOTEBOOK</p>
        <h1>All the field notes.</h1>
        <p>Projects, practical tutorials, and lessons from building things.</p>
      </section>
      <Category />
      <PostCard nodes={data.allMdx.nodes} />
      {numPages > 1 && (
        <nav className="pagination" aria-label="Article pagination">
          {currentPage > 1 && (
            <Link rel="prev" to={pagePath(currentPage - 1)}>
              ← Previous
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <Link
              aria-current={currentPage === i + 1 ? "page" : undefined}
              key={i}
              to={pagePath(i + 1)}
            >
              {i + 1}
            </Link>
          ))}
          {currentPage < numPages && (
            <Link rel="next" to={pagePath(currentPage + 1)}>
              Next →
            </Link>
          )}
        </nav>
      )}
    </Layout>
  );
}
export const query = graphql`
  query BlogArchive($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      nodes {
        ...PostCardData
      }
    }
  }
`;
export const Head = ({ pageContext: { currentPage } }) => (
  <SEO
    title={currentPage === 1 ? "All writing" : `Writing · Page ${currentPage}`}
    pathname={pagePath(currentPage)}
  />
);
