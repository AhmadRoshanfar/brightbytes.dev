import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const PostCard = ({ nodes }) => {
  return (
    <div className="flex flex-col w-full">
      {nodes.map((node) => (
        <article className="mt-2" key={node.id}>
          <Link className="p-0 m-0" to={`/blog/${node.frontmatter.slug}`}>
          <div className="bg-post-bg text-white ">
            <div className="flex md:flex-row flex-col justify-between">
              <div className="flex flex-col w-2/3">
                <h2 className="font-bold my-1 mx-3 py-3 text-lg">
                  <Link className="text-2xl ml-2" to={`/blog/${node.frontmatter.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <p className="mx-6 text-gray-300 text-wrap">{node.excerpt}</p>
              </div>
              <GatsbyImage
                className="rounded-lg m-5 sm:w-60 sm:h-30 w-40 h-30 overflow-hidden"
                image={getImage(
                  node.frontmatter.featuredImage.childImageSharp.gatsbyImageData
                )}
                backgroundColor="white"
                imgStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
            </div>
            <div className="flex justify-between items-center mt-2 mx-3 text-sm">
              <p className="ml-4">Author: Ahmad Roshanfar</p>
              <p className="mr-4">Posted: {node.frontmatter.date}</p>
            </div>
          </div>
      </Link>
        </article>
      ))}
    </div>
  );
};

export default PostCard;
