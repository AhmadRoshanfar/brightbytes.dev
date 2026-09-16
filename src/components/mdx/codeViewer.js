import React, { useEffect, useRef, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import dart from "react-syntax-highlighter/dist/esm/languages/prism/dart";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { track } from "../../lib/analytics";
Object.entries({ bash, javascript, json, css, python, cpp, dart }).forEach(
  ([name, syntax]) => SyntaxHighlighter.registerLanguage(name, syntax),
);
export default function CodeViewer({ code, language = "bash" }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied!");
      track("copy_code", { language, page_path: window.location.pathname });
    } catch {
      setStatus("Select the code to copy it");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{language}</span>
        <button onClick={copy} aria-label="Copy code">
          {status === "Copied!" ? <Check size={14} /> : <Copy size={14} />}
          <span>{status || "Copy"}</span>
        </button>
        <span className="sr-only" role="status">
          {status}
        </span>
      </div>
      <div
        className="code-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${language} code`}
      >
        <SyntaxHighlighter
          language={language}
          style={dracula}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1.35rem",
            fontSize: ".85rem",
            lineHeight: 1.8,
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
