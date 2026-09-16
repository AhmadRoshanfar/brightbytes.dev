import React from "react";
import { Coffee, ArrowUpRight } from "lucide-react";
import site from "../../config";
import { track } from "../lib/analytics";

const configuredUrl = process.env.GATSBY_SUPPORT_URL ?? site.supportUrl;
const label = site.supportLabel || "Support the blog";
const supportUrl = (() => {
  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
})();

export function SupportLink({ placement = "footer", slug, className }) {
  if (!supportUrl) return null;
  return (
    <a
      className={className}
      href={supportUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("support_click", {
          placement,
          ...(slug ? { article_slug: slug } : {}),
        })
      }
    >
      <Coffee size={18} aria-hidden="true" />
      {label}
      <ArrowUpRight size={15} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function SupportCard({ slug }) {
  if (!supportUrl) return null;
  return (
    <aside className="support-card" aria-label="Support BrightBytes">
      <div className="support-icon" aria-hidden="true">
        <Coffee size={25} strokeWidth={1.5} />
      </div>
      <div className="support-copy">
        <h2>Did this help you build something?</h2>
        <p>
          If these notes saved you some time, you can buy me a coffee.
          Your support helps me keep experimenting and sharing what I learn.
        </p>
        <SupportLink
          className="button support-button"
          placement="article"
          slug={slug}
        />
        <span className="support-note">Always optional. Thanks for reading.</span>
      </div>
    </aside>
  );
}
