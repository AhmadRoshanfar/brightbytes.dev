import React from "react";
import { Link, graphql } from "gatsby";
import { ArrowRight, Rss, Terminal } from "lucide-react";
import Layout from "../components/layout/layout";
import PostCard from "../components/postCard";
import Category from "../components/category";
import { SEO } from "../components/seo";
export default function Home({ data }) {
  return (
    <Layout>
      <section className="hero enter">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> A developer’s field notes
          </p>
          <h1>
            Curiosity, turned
            <br />
            into <em>working things.</em>
          </h1>
          <p className="hero-description">
            Notes from the intersection of hardware and software. Practical
            guides, small experiments, and things I learned along the way.
          </p>
          <div className="hero-actions">
            <a className="button" href="#latest">
              Explore the notes <ArrowRight size={16} />
            </a>
            <Link className="subtle-link" to="/about/">
              A little about me <ArrowRight size={15} />
            </Link>
          </div>
          <p className="hero-signature">
            Written by <strong>Ahmad Roshanfar</strong>
          </p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-label">
            THE WORKBENCH <span>01 — ∞</span>
          </div>
          <div className="circuit">
            <span className="circuit-label label-top">IDEA</span>
            <div className="circuit-line line-top" />
            <div className="chip">
              <Terminal size={38} />
              <span>
                BUILD. LEARN.
                <br />
                REPEAT.
              </span>
            </div>
            <div className="circuit-line line-bottom" />
            <span className="circuit-label label-bottom">SOMETHING REAL</span>
            <span className="node node-one" />
            <span className="node node-two" />
          </div>
          <div className="visual-footer">
            <span className="status-dot" /> Always a work in progress
          </div>
        </div>
      </section>
      <section id="latest" className="latest-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE NOTEBOOK</p>
            <h2>
              Latest writing
              <span className="count-badge">{data.allMdx.totalCount}</span>
            </h2>
          </div>
          <Link className="subtle-link" to="/blog/">
            View all notes <ArrowRight size={15} />
          </Link>
        </div>
        <Category />
        <PostCard nodes={data.allMdx.nodes} />
      </section>
      <section className="rss-callout">
        <div>
          <span className="eyebrow">KEEP YOUR CURIOSITY FED</span>
          <h2>Good things take a little tinkering.</h2>
          <p>Follow along. New notes, straight to your feed reader.</p>
        </div>
        <a className="button secondary" href="/rss.xml">
          <Rss size={17} /> Subscribe via RSS
        </a>
      </section>
    </Layout>
  );
}
export const query = graphql`
  query HomeArticles {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 6) {
      totalCount
      nodes {
        ...PostCardData
      }
    }
  }
`;
export const Head = () => (
  <SEO title="Notes on hardware, software & everything between" />
);
