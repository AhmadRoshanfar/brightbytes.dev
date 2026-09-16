import React from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Layout from "../../components/layout/layout";
import { SEO } from "../../components/seo";
export default function Contact() {
  return (
    <Layout>
      <section className="page-intro narrow">
        <p className="eyebrow">LET’S COMPARE NOTES</p>
        <h1>
          Say hello<span className="brand-dot">.</span>
        </h1>
        <p>
          A question about an article, a project to share, or just a good idea —
          I’d love to hear it.
        </p>
      </section>
      <div className="contact-grid">
        {[
          {
            icon: Mail,
            title: "Email",
            text: "ahmadroshanfar@gmail.com",
            href: "mailto:ahmadroshanfar@gmail.com",
          },
          {
            icon: Github,
            title: "GitHub",
            text: "Explore the projects",
            href: "https://github.com/AhmadRoshanfar",
          },
          {
            icon: Linkedin,
            title: "LinkedIn",
            text: "Let’s connect",
            href: "https://www.linkedin.com/in/ahmadroshanfar/",
          },
        ].map(({ icon: Icon, title, text, href }) => (
          <a className="contact-card" key={title} href={href}>
            <Icon size={24} />
            <h2>{title}</h2>
            <p>{text}</p>
            <ArrowUpRight className="contact-arrow" size={20} />
          </a>
        ))}
      </div>
    </Layout>
  );
}
export const Head = () => (
  <SEO
    title="Contact"
    pathname="/contact/"
    description="Get in touch with Ahmad Roshanfar about BrightBytes articles, embedded systems, and software projects."
  />
);
