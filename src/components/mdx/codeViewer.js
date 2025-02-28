// CodeViewer.js
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ code, language = 'bash', filename = "  " }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        margin: '1em 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#132942',
          padding: '0.5em 1em',
          alignItems: 'center',
          color:"white"
        }}
      >
        {filename && <strong>{filename}</strong>}
        <button
          onClick={handleCopy}
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.3em 0.6em',
            cursor: 'pointer',
            color: "#132942"
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code block */}
      <SyntaxHighlighter
        language={language}
        style={prism}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
