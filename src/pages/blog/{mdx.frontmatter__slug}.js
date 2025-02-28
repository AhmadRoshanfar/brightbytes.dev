import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/postTitle";

const BlogPost = ({ data, children }) => {
  // const image = getImage(data.mdx.frontmatter.hero_image);
  const tags = data.mdx.frontmatter.tags || [];

  return (
    <>
      <MDXProvider
        components={
          {
            // code: (props) => <p {...props} style={{ color: "gray" }} />,
          }
        }
      >
        <Layout>
          <PostTitle data={data} tags={tags} />
          {children}
          {/* <BuyMeCoffee /> */}
        </Layout>
      </MDXProvider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 512)
          }
        }

        #   hero_image_alt
        #   hero_image_credit_link
        #   hero_image_credit_text
        #   hero_image
      }
    }
  }
`;

export const Head = ({ data }) => <title>{data.mdx.frontmatter.title}</title>;

export default BlogPost;
