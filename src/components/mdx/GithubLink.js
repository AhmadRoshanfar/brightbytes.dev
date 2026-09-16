import React from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { track } from "../../lib/analytics";
export default function GitHubLink({ url, label = "View on GitHub" }) {
  return (
    <div className="repository-link">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("project_click", { link_url: url })}
      >
        <Github size={20} />
        {label}
        <ArrowUpRight size={16} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
