import React from 'react';

const TitleBar = ({ text, size, bkgdColor }) => (
  <div
    style={{
      margin: '2rem 0',
      padding: '2rem',
      backgroundColor: bkgdColor || '#fff',
    }}
  >
    <h2
      style={{
        fontSize: size || '18px',
        margin: 0,
      }}
    >
      {text}
    </h2>
  </div>
);

export default TitleBar;
