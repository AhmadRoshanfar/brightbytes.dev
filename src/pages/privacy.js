import React from "react";
import Layout from "../components/layout/layout";
import { SEO } from "../components/seo";
import { AnalyticsPreferences } from "../components/analyticsConsent";
export default function Privacy() {
  return (
    <Layout>
      <section className="page-intro narrow">
        <p className="eyebrow">YOUR VISIT, YOUR CHOICE</p>
        <h1>Privacy & analytics.</h1>
        <p>A short explanation of what this site stores and measures.</p>
      </section>
      <div className="prose narrow">
        <h2>Reading preferences</h2>
        <p>
          Your theme, text size, and analytics choice are saved in your
          browser’s local storage so the site remembers them on your next visit.
        </p>
        <h2>Optional analytics</h2>
        <p>
          When Google Analytics is configured, it loads only after you choose
          “Allow analytics”. It measures page visits, reading progress, code
          copies, copied article links, and clicks on project repositories and
          support links.
          Google may also collect technical information such as browser, device,
          and approximate location.
        </p>
        <p>
          We don’t send search text or URL query parameters through our custom
          events. Advertising personalization and Google signals are disabled.
          Google Analytics uses cookies to distinguish visits; you can decline
          analytics and still use every article.
        </p>
        <h2>Changing your choice</h2>
        <p>
          Use “Analytics preferences” in the footer to allow or decline
          analytics at any time. Declining stops future collection from this
          site and removes its accessible Analytics cookies. It does not erase
          data already collected.
        </p>
        <AnalyticsPreferences />
        <h2>Hosting and external links</h2>
        <p>
          This site is hosted on GitHub Pages. The hosting provider may process
          request information to serve and protect the site. External sites,
          including GitHub and LinkedIn, have their own privacy practices.
        </p>
        <h2>Supporting the blog</h2>
        <p>
          Support links take you to an external payment service. This site does
          not collect card details or process payments. The service handles
          payment information under its own privacy policy. Optional analytics
          measures a click on a support link, not whether a payment was made.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a href="mailto:ahmadroshanfar@gmail.com">ahmadroshanfar@gmail.com</a>
          .
        </p>
      </div>
    </Layout>
  );
}
export const Head = () => (
  <SEO title="Privacy & analytics" pathname="/privacy/" />
);
