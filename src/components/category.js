import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { tagPath } from "../lib/content.cjs";
export default function Category() {
  const { allMdx } = useStaticQuery(graphql`
    query TopicNavigation {
      allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  return (
    <nav className="topic-nav" aria-label="Browse by topic">
      <Link className="topic-chip" to="/blog/" activeClassName="selected">
        All notes
      </Link>
      {allMdx.group.map((tag) => (
        <Link
          className="topic-chip"
          activeClassName="selected"
          key={tag.fieldValue}
          to={tagPath(tag.fieldValue)}
        >
          {tag.fieldValue}
          <span>{tag.totalCount}</span>
        </Link>
      ))}
    </nav>
  );
}
