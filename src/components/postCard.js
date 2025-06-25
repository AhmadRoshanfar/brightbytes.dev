import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const PostCard = ({ nodes }) => {
  return (
    <div className="flex flex-col w-full space-y-3 pt-2">
      {nodes.map((node) => (
        <article
          key={node.id}
          className="bg-post-bg text-white rounded-lg shadow-md overflow-hidden"
        >
          <Link to={`/blog/${node.frontmatter.slug}`}>
            <div className="flex flex-col md:flex-row items-start gap-4 px-4">
              <div className="w-full md:w-auto flex justify-center">
                <div className="w-full h-40 sm:h-32 flex items-center justify-center bg-white rounded-md overflow-hidden">
                  <GatsbyImage
                    className="w-full h-full object-contain"
                    image={getImage(node.frontmatter.featuredImage.childImageSharp.gatsbyImageData)}
                    alt={node.frontmatter.title}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between w-full px-2 pb-2 md:px-2">
                <h2 className="text-lg font-bold mb-2">{node.frontmatter.title}</h2>
                <p className="hidden sm:block text-gray-300 text-sm line-clamp-3 mb-4">
                  {node.excerpt}
                </p>
                <div className="flex justify-between text-xs text-gray-400 mt-auto">
                  <span>Author: Ahmad Roshanfar</span>
                  <span>{node.frontmatter.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default PostCard;
