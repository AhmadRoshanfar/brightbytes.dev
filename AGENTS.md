# Project conventions

## Article illustrations

When adding or replacing post covers, follow `docs/post-cover-style.md`. The user
requested a consistent visual style for all current and future posts. Read that
guide before generating assets, use the existing e-paper cover as the visual
reference, and change the subject to match the article.

Save the finished image as `src/blog/<article-folder>/cover.png`, set
`featuredImage: ./cover.png`, and provide descriptive `featuredImageAlt` text.
Preserve factual tutorial screenshots. Generated covers are conceptual
illustrations, not documentation of real hardware or software output.

Keep covers at 16:10 in cards and article headers. Use Gatsby's responsive image
pipeline rather than loading the full source PNG directly. After changes, run
the production build and `npm run check:build`, then check desktop and mobile
rendering. Record generation prompts in `docs/post-cover-prompts.json`.
