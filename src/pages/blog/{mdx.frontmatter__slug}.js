import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/postTitle";
import ReaderTools from "../../components/reader/readerTools";
import PostCard from "../../components/postCard";
import SupportCard from "../../components/support";
import { SEO } from "../../components/seo";
import { postPath } from "../../lib/content.cjs";
const heading = (Tag) =>
  function ArticleHeading({ id, children, ...props }) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id && (
          <a
            className="heading-anchor"
            href={`#${id}`}
            aria-label="Link to this section"
          >
            #
          </a>
        )}
      </Tag>
    );
  };
const components = {
  h1: heading("h2"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  table: (props) => (
    <div
      className="table-scroll"
      role="region"
      aria-label="Article table"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  ),
};
export default function BlogPost({ data, children }) {
  const post = data.mdx.frontmatter;
  const tags = post.tags || [];
  const related = data.allMdx.nodes
    .filter((node) => node.id !== data.mdx.id)
    .sort(
      (a, b) =>
        (b.frontmatter.tags || []).filter((t) => tags.includes(t)).length -
        (a.frontmatter.tags || []).filter((t) => tags.includes(t)).length,
    )
    .slice(0, 2);
  return (
    <Layout className="article-page">
      <PostTitle data={data} tags={tags} />
      <div className="reading-layout">
        <ReaderTools toc={data.mdx.tableOfContents} slug={post.slug} />
        <div className="article-column">
          <MDXProvider components={components}>
            <article id="article-body" className="prose">
              {children}
            </article>
          </MDXProvider>
          <div className="article-end">
            <span className="end-mark">◆</span>
            <p>Thanks for reading.</p>
            <span>Found something useful, or have a question?</span>
            <Link className="subtle-link" to="/contact/">
              Let’s talk →
            </Link>
          </div>
          <div className="author-card">
            <span className="avatar">AR</span>
            <div>
              <Link to="/about/">
                <strong>Ahmad Roshanfar</strong>
              </Link>
              <p>
                Exploring embedded systems, Linux, and the software that brings
                hardware to life.
              </p>
            </div>
          </div>
          <SupportCard slug={post.slug} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LITTLE MORE TO EXPLORE</p>
              <h2>Keep the curiosity going.</h2>
            </div>
          </div>
          <PostCard nodes={related} />
        </section>
      )}
    </Layout>
  );
}
export const query = graphql`
  query Article($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 180)
      tableOfContents(maxDepth: 3)
      fields {
        readingMinutes
      }
      frontmatter {
        title
        slug
        tags
        description
        date(formatString: "MMMM D, YYYY")
        rawDate: date(formatString: "YYYY-MM-DD")
        updated(formatString: "MMM D, YYYY")
        rawUpdated: updated(formatString: "YYYY-MM-DD")
        featuredImageAlt
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 1200, aspectRatio: 1.6, placeholder: BLURRED)
            resize(width: 1200) {
              src
            }
          }
        }
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        ...PostCardData
      }
    }
  }
`;
export const Head = ({ data }) => {
  const post = data.mdx.frontmatter;
  return (
    <SEO
      title={post.title}
      description={post.description || data.mdx.excerpt}
      pathname={postPath(post.slug)}
      image={post.featuredImage?.childImageSharp?.resize?.src}
      imageAlt={post.featuredImageAlt}
      article={{ date: post.rawDate, updated: post.rawUpdated }}
    />
  );
};
