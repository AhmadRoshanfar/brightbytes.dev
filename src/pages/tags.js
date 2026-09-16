import React from "react";
import Layout from "../components/layout/layout";
import Category from "../components/category";
import { SEO } from "../components/seo";
export default function Tags() {
  return (
    <Layout>
      <section className="page-intro">
        <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
        <h1>Browse the topics.</h1>
        <p>Pick a subject and see what’s on the workbench.</p>
      </section>
      <Category />
    </Layout>
  );
}
export const Head = () => <SEO title="Topics" pathname="/tags/" />;
