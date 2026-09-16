import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Moon, Sun, Search, ArrowUpRight, Terminal } from "lucide-react";
export default function Header() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved;
      try {
        saved = localStorage.getItem("bb-theme");
      } catch {}
      const next = saved || (media.matches ? "dark" : "light");
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("bb-theme", next);
    } catch {}
  }
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="BrightBytes home">
          <span className="brand-mark">
            <Terminal size={19} />
          </span>
          <span>
            bright<span className="brand-light">bytes</span>
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/blog/" activeClassName="nav-active" partiallyActive>
            Writing
          </Link>
          <Link to="/about/" activeClassName="nav-active">
            About
          </Link>
          <Link
            to="/contact/"
            activeClassName="nav-active"
            className="contact-nav"
          >
            Contact <ArrowUpRight size={13} />
          </Link>
        </nav>
        <div className="header-actions">
          <Link
            to="/search/"
            className="icon-button"
            aria-label="Search articles"
          >
            <Search size={19} />
          </Link>
          <span className="divider" />
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
