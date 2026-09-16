import React from "react";
import { Link } from "gatsby";
import { ArrowRight, Terminal, Cpu, Code2 } from "lucide-react";
import Layout from "../components/layout/layout";
import { SEO } from "../components/seo";
export default function About() {
  return (
    <Layout>
      <section className="page-intro narrow">
        <p className="eyebrow">THE PERSON BEHIND THE NOTES</p>
        <h1>
          Hello, I’m Ahmad<span className="brand-dot">.</span>
        </h1>
        <p>I like exploring what happens when hardware meets software.</p>
      </section>
      <div className="about-content">
        <div className="prose">
          <p>
            BrightBytes is my notebook for the things I build and learn:
            embedded Linux, electronics, and applications that connect the two.
          </p>
          <p>
            Here, I share practical walkthroughs and project notes — from
            running Flutter on a small Linux board to putting a photo on an
            e-paper display. My aim is to make each experiment easier for the
            next person to follow.
          </p>
          <p>
            If you’re working on something similar, or spot a way to improve a
            guide, I’d love to hear from you.
          </p>
          <Link className="button" to="/contact/">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
        <div className="interest-list">
          <div>
            <Cpu />
            <h2>Hardware & embedded</h2>
            <p>Small boards. Real-world projects.</p>
          </div>
          <div>
            <Terminal />
            <h2>Linux & tools</h2>
            <p>Useful workflows, one command at a time.</p>
          </div>
          <div>
            <Code2 />
            <h2>Software & interfaces</h2>
            <p>Applications that make things work.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const Head = () => (
  <SEO
    title="About Ahmad Roshanfar"
    pathname="/about/"
    description="Meet Ahmad Roshanfar, the developer behind BrightBytes: a notebook of embedded Linux, electronics, and software projects."
  />
);
