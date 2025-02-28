import { Link, graphql } from "gatsby";
import React from "react";
import Category from "../components/category";
import Layout from "../components/layout/layout";
import PostCard from "../components/postCard";

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMdx.edges;
    const nodes = this.props.data.allMdx.nodes;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    console.log(posts);
    return (
      <Layout>
        <div className="flex flex-col md:flex-row space-x-4">
          <PostCard nodes={nodes} />
          <Category />
        </div>
        <div className="flex flex-row justify-center items-center">
          {!isFirst && (
            <Link
              to={`/blog${currentPage === 2 ? "" : `/${prevPage}`}`}
              rel="prev"
            >
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <p
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link to={`/blog/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
            </p>
          ))}
          {!isLast && (
            <Link to={`/blog/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )}
        </div>
      </Layout>
    );
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
      nodes {
        frontmatter {
          title
          slug
          date(formatString: "MMMM D, YYYY")
          featuredImage {
            childImageSharp {
              gatsbyImageData(height:130)
            }
          }
        }
        id
        excerpt(pruneLength: 220)
      }
    }
  }
`;
