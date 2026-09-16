import React from "react";
import Header from "./header";
import Footer from "./footer";
import AnalyticsConsent from "../analyticsConsent";
export default function Layout({ children, className = "" }) {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className={`site-main ${className}`}
      >
        {children}
      </main>
      <Footer />
      <AnalyticsConsent />
    </div>
  );
}
