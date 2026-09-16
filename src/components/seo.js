import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";
export const SEO = ({
  title,
  description,
  pathname = "/",
  image,
  imageAlt,
  article,
  noindex = false,
  children,
}) => {
  const site = useSiteMetadata();
  const url = new URL(pathname, site.siteUrl).href;
  const pageTitle = title ? `${title} · ${site.title}` : site.title;
  const summary = description || site.description;
  const cover = new URL(image || "/social-card.png", site.siteUrl).href;
  const schema = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: summary,
        image: [cover],
        datePublished: article.date,
        dateModified: article.updated || article.date,
        mainEntityOfPage: url,
        author: {
          "@type": "Person",
          name: site.author,
          url: `${site.siteUrl}/about/`,
        },
        publisher: {
          "@type": "Organization",
          name: site.title,
          url: site.siteUrl,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.title,
        url: site.siteUrl,
        description: site.description,
      };
  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={summary} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow"}
      />
      <meta name="color-scheme" content="light dark" />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={cover} />
      <meta property="og:image:alt" content={imageAlt || title || site.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={cover} />
      <meta name="twitter:image:alt" content={imageAlt || title || site.title} />
      {article && (
        <meta property="article:published_time" content={article.date} />
      )}
      {article && (
        <meta
          property="article:modified_time"
          content={article.updated || article.date}
        />
      )}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="BrightBytes RSS"
        href="/rss.xml"
      />
      <script type="application/ld+json">
        {JSON.stringify(schema).replace(/</g, "\\u003c")}
      </script>
      {children}
    </>
  );
};
