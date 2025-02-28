import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import React from "react";

const TitleTags = ({ tags }) => {
  return (
    <div className="flex flex-row h-full justify-center items-center">
      {tags.map((tag) => (
        <Link
          to={`/tags/${kebabCase(tag)}/`}
          className="flex mx-1 my-2 bg-gray-200 py-1 px-2 text-sm rounded	"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};
export default TitleTags;
