import * as React from "react";
import { SEO } from "../components/seo";
import { useEffect } from "react"
import { navigate } from "gatsby"

const IndexPage = () => {
    useEffect(() => {
      navigate("/blog", { replace: true })
    }, [])
  
    return null
};

export default IndexPage;

export const Head = () => <SEO title="Home Page" />;
