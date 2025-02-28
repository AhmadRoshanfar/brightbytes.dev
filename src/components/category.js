import { Link, StaticQuery, graphql } from "gatsby";
import kebabCase from "lodash/kebabCase";
import React from "react";

export default function Category() {
  return (
    <StaticQuery
      query={graphql`
        query TagsQuery {
          allMdx(limit: 2000) {
            group(field: { frontmatter: { tags: SELECT } }) {
              tag: fieldValue
              totalCount
            }
          }
        }
      `}
      render={(data) => (
        <div className="bg-gray-800 rounded-lg px-10 py-4 m-2 h-fit text-white ">
          <div>
            <h1 className="text-center">Tags</h1>
            <div>
              {data.allMdx.group.map((tag) => (
                <p key={tag.fieldValue} className="w-full py-2">
                  <Link
                    to={`/tags/${kebabCase(tag.tag)}/`}
                    className=" w-full justify-start px-3 whitespace-nowrap items-start text-start bg-black text-teal-300 "
                  >
                    {tag.tag} ({tag.totalCount})
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
}
