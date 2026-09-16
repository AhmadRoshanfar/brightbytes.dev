import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowUpRight, Code2 } from "lucide-react";
import { postPath } from "../lib/content.cjs";
export const fragment = graphql`
  fragment PostCardData on Mdx {
    id
    excerpt(pruneLength: 160)
    fields {
      readingMinutes
    }
    frontmatter {
      title
      slug
      description
      date(formatString: "MMM D, YYYY")
      tags
      featuredImage {
        childImageSharp {
          gatsbyImageData(width: 800, aspectRatio: 1.6, placeholder: BLURRED)
        }
      }
    }
  }
`;
export default function PostCard({ nodes = [] }) {
  return (
    <div className="post-grid">
      {nodes.map((node, index) => {
        const post = node.frontmatter;
        const image = getImage(post.featuredImage);
        return (
          <article
            className="post-card enter"
            style={{ "--delay": `${index * 65}ms` }}
            key={node.id}
          >
            <Link className="post-card-link" to={postPath(post.slug)}>
              <div className="card-image">
                {image ? (
                  <GatsbyImage image={image} alt="" />
                ) : (
                  <div className="image-placeholder">
                    <Code2 size={44} />
                  </div>
                )}
                <span className="image-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <div className="card-body">
                <div className="card-category">
                  {(post.tags || []).slice(0, 2).join(" / ") || "Field notes"}
                </div>
                <h2>{post.title}</h2>
                <p>{post.description || node.excerpt}</p>
                <div className="card-meta">
                  <span>{post.date}</span>
                  <span className="meta-dot" />
                  <span>{node.fields.readingMinutes} min read</span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
