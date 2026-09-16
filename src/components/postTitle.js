import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowLeft, Clock3 } from "lucide-react";
import TitleTags from "./titleTags";
export default function PostTitle({ data, tags }) {
  const post = data.mdx.frontmatter;
  const image = getImage(post.featuredImage);
  return (
    <header className="article-header enter">
      <Link className="back-link" to="/blog/">
        <ArrowLeft size={15} /> Back to writing
      </Link>
      <TitleTags tags={tags} />
      <h1>{post.title}</h1>
      {post.description && <p className="article-deck">{post.description}</p>}
      <div className="article-byline">
        <span className="avatar">AR</span>
        <div>
          <Link to="/about/">Ahmad Roshanfar</Link>
          <div className="byline-details">
            <time dateTime={post.rawDate}>{post.date}</time>
            <span>·</span>
            <span>
              <Clock3 size={13} /> {data.mdx.fields.readingMinutes} min read
            </span>
            {post.updated && <span>Updated {post.updated}</span>}
          </div>
        </div>
      </div>
      {image && (
        <div className="article-cover">
          <GatsbyImage
            image={image}
            alt={post.featuredImageAlt || post.title}
            loading="eager"
            imgStyle={{ objectFit: "cover" }}
          />
        </div>
      )}
    </header>
  );
}
