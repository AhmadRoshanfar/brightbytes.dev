import React from "react";
import { Link } from "gatsby";
import { tagPath } from "../lib/content.cjs";
export default function TitleTags({ tags = [] }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Link className="tag" key={tag} to={tagPath(tag)}>
          {tag}
        </Link>
      ))}
    </div>
  );
}
