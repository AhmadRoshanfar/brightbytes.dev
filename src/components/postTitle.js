import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TitleTags from "./titleTags";

/* Comment */
const PostTitle = ({ data, tags }) => {
  return (
    <>
      <GatsbyImage
        className="rounded-lg m-5 w-full "
        image={getImage(
          data.mdx.frontmatter.featuredImage.childImageSharp.gatsbyImageData
        )}
        imgStyle={{ objectFit: "contain" }}
      />

      <div className="flex justify-center items-center">
        <div className="inline-block">
          <h1 className="text-center text-4xl font-bold mt-8">
            {data.mdx.frontmatter.title}
          </h1>
          <div className="flex justify-start text-center pb-6 ">
            <p className="flex items-start text-center">
              {data.mdx.frontmatter.date}
            </p>
            <TitleTags tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostTitle;
