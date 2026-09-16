import React from "react";
import { Link } from "gatsby";
import { Github, Linkedin, Rss, ArrowUpRight } from "lucide-react";
import { AnalyticsPreferences } from "../analyticsConsent";
import { SupportLink } from "../support";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" to="/">
            brightbytes.
          </Link>
          <p>Small discoveries. Useful things.</p>
        </div>
        <div className="footer-links">
          <SupportLink className="footer-support" />
          <a
            href="https://github.com/AhmadRoshanfar"
            aria-label="Ahmad on GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmadroshanfar/"
            aria-label="Ahmad on LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a href="/rss.xml" aria-label="Subscribe via RSS">
            <Rss size={19} />
          </a>
          <Link to="/contact/">
            Say hello <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ahmad Roshanfar</span>
        <div>
          <Link to="/privacy/">Privacy</Link>
          <AnalyticsPreferences />
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
