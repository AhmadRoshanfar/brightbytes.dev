import { graphql, useStaticQuery } from "gatsby";
export const useSiteMetadata = () =>
  useStaticQuery(graphql`
    query SiteDetails {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `).site.siteMetadata;
