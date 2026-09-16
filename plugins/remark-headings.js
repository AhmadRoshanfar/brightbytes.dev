module.exports = function remarkHeadings() {
  return async function transform(tree) {
    const { default: Slugger } = await import("github-slugger");
    const slugger = new Slugger();
    const text = (node) =>
      node.value || (node.children || []).map(text).join("");
    const walk = (node) => {
      if (node.type === "heading") {
        node.data = {
          ...node.data,
          hProperties: {
            ...node.data?.hProperties,
            id: slugger.slug(text(node)),
          },
        };
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
};
