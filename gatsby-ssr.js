const React = require("react");
exports.onRenderBody = ({ setPreBodyComponents }) =>
  setPreBodyComponents([
    React.createElement("script", {
      key: "reading-preferences",
      dangerouslySetInnerHTML: {
        __html: `(function(){try{var t=localStorage.getItem('bb-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var s=localStorage.getItem('bb-text-size');if(s==='large')document.documentElement.dataset.textSize=s;}catch(e){}})();`,
      },
    }),
  ]);
