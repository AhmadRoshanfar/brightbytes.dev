import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/layout";
import Category from "../components/category";
import PostCard from "../components/postCard";
import { SEO } from "../components/seo";
import { tagPath } from "../lib/content.cjs";
export default function TagPage({ data, pageContext: { tag } }) {
  return (
    <Layout>
      <section className="page-intro">
        <p className="eyebrow">EXPLORE A TOPIC</p>
        <h1>{tag}</h1>
        <p>
          {data.allMdx.totalCount}{" "}
          {data.allMdx.totalCount === 1 ? "note" : "notes"} from the workbench.
        </p>
      </section>
      <Category />
      <PostCard nodes={data.allMdx.nodes} />
    </Layout>
  );
}
export const query = graphql`
  query TaggedArticles($tag: String!) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        ...PostCardData
      }
    }
  }
`;
export const Head = ({ pageContext: { tag } }) => (
  <SEO
    title={`${tag} articles`}
    description={`Practical ${tag} tutorials and project notes by Ahmad Roshanfar.`}
    pathname={tagPath(tag)}
  />
);
