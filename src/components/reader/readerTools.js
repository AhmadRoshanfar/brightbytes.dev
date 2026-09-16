import React, { useEffect, useRef, useState } from "react";
import { Link2, Check, Type } from "lucide-react";
import { track } from "../../lib/analytics";
function TocItems({ items = [], active }) {
  return (
    <ol>
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            aria-current={active === item.url.slice(1) ? "location" : undefined}
          >
            {item.title}
          </a>
          {item.items && <TocItems items={item.items} active={active} />}
        </li>
      ))}
    </ol>
  );
}
export default function ReaderTools({ toc, slug }) {
  const [active, setActive] = useState("");
  const [large, setLarge] = useState(false);
  const [copied, setCopied] = useState("");
  const bar = useRef(null);
  const timer = useRef(null);
  useEffect(() => {
    setLarge(document.documentElement.dataset.textSize === "large");
    let frame;
    const sent = new Set();
    const article = document.getElementById("article-body");
    if (!article) return;
    const headings = [...article.querySelectorAll("h2[id],h3[id]")];
    const update = () => {
      frame = null;
      const rect = article.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / Math.max(1, rect.height)),
      );
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      const current = headings
        .filter((h) => h.getBoundingClientRect().top <= 150)
        .pop();
      setActive(current?.id || headings[0]?.id || "");
      [25, 50, 75, 100].forEach((milestone) => {
        if (progress * 100 >= milestone && !sent.has(milestone)) {
          if (
            track("article_progress", {
              article_slug: slug,
              percent_scrolled: milestone,
            })
          )
            sent.add(milestone);
        }
      });
    };
    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("bb-consent-change", request);
    const observer = new ResizeObserver(request);
    observer.observe(article);
    return () => {
      observer.disconnect();
      window.removeEventListener("bb-consent-change", request);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
      clearTimeout(timer.current);
    };
  }, [slug]);
  function resize() {
    const next = !large;
    setLarge(next);
    document.documentElement.dataset.textSize = next ? "large" : "normal";
    try {
      localStorage.setItem("bb-text-size", next ? "large" : "normal");
    } catch {}
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + window.location.pathname,
      );
      setCopied("Link copied");
      track("share", {
        method: "copy_link",
        content_type: "article",
        item_id: slug,
      });
    } catch {
      setCopied("Copy the address from your browser");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(""), 3000);
  }
  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div ref={bar} />
      </div>
      <aside className="reader-sidebar">
        <div className="reader-sticky">
          <details className="toc" open>
            <summary>On this page</summary>
            <nav aria-label="Table of contents">
              <TocItems items={toc?.items} active={active} />
            </nav>
          </details>
          <div className="reading-tools">
            <p className="eyebrow">MAKE YOURSELF COMFORTABLE</p>
            <button onClick={resize} aria-pressed={large}>
              <Type size={16} />
              {large ? "Standard text" : "Larger text"}
            </button>
            <button onClick={copy}>
              {copied === "Link copied" ? (
                <Check size={16} />
              ) : (
                <Link2 size={16} />
              )}
              Copy article link
            </button>
            <span className="tool-status" role="status">
              {copied}
            </span>
          </div>
          <a className="back-link" href="#top">
            Back to top ↑
          </a>
        </div>
      </aside>
    </>
  );
}
