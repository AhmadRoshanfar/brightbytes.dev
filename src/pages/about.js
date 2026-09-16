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
        <p>I build software for devices, from the firmware to the screen.</p>
      </section>
      <div className="about-content">
        <div className="prose">
          <p>
            I’m an embedded software engineer based in Canada. I work on the
            different pieces that make a device useful: firmware, Linux systems,
            wireless connections, and the applications people use to interact
            with it.
          </p>
          <p>
            I like working across those layers. A project might start with
            getting a sensor reading, then grow into a Linux application or an
            interface that makes the data easier to understand. Figuring out how
            the pieces fit together is a big part of what I enjoy about the work.
          </p>
          <p>
            BrightBytes is where I keep notes from that process. I write about
            things I’ve tried, problems I’ve worked through, and details I’d want
            to remember next time. Some posts are step-by-step guides. Others
            are small experiments that seemed worth sharing.
          </p>
          <p>
            I hope you find something here that helps with your own projects.
            If you’ve tried a different approach, spotted a mistake, or just
            want to talk about what you’re building, I’d be happy to hear from you.
          </p>
          <Link className="button" to="/contact/">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
        <div className="interest-list">
          <div>
            <Cpu />
            <h2>Embedded systems</h2>
            <p>Firmware, sensors, and connected devices.</p>
          </div>
          <div>
            <Terminal />
            <h2>Linux & development</h2>
            <p>Bringing up boards and building the software around them.</p>
          </div>
          <div>
            <Code2 />
            <h2>Applications & interfaces</h2>
            <p>Tools that make devices easier to use.</p>
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
    description="Ahmad Roshanfar is an embedded software engineer based in Canada. BrightBytes is where he shares notes on firmware, Linux, connected devices, and applications."
  />
);
