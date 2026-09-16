# BrightBytes.dev

A Gatsby + MDX technical blog hosted on GitHub Pages at https://brightbytes.dev.

## Local development

Node 22.20.0 was used for verification. The existing Gatsby 5 dependency tree needs npm’s legacy peer resolution.

```sh
npm ci --legacy-peer-deps
npm run develop
```

## Validate and preview

```sh
npm test
npm run build
npm run check:build
npm run serve
```

The output check uses Python 3’s standard library. It checks generated pages, article headings, internal links and anchors, canonical/social metadata, JSON-LD, RSS, sitemap, robots.txt, and the custom domain. GitHub Actions runs these checks for pushes and pull requests. It does not deploy.

The existing `npm run deploy` command builds the static output and publishes it to the `gh-pages` branch. Review the local preview before deploying. All article and tag URLs are preserved; canonical URLs use trailing slashes. `static/CNAME` retains the custom domain.

## Project map

- `config.js`: site identity, canonical origin, author, and default public GA4 ID.
- `src/blog/<article>/index.mdx`: articles and colocated images.
- `src/components/layout/`: shared header, footer, theme, and page shell.
- `src/components/reader/`: table of contents, progress, text size, and sharing.
- `src/components/mdx/`: code blocks and repository links for articles.
- `src/lib/analytics.js`: consent-gated analytics and event dispatch.
- `src/lib/content.cjs`: content validation, URL helpers, and estimated reading time.
- `plugins/remark-headings.js`: stable section IDs, including duplicate-heading handling.
- `src/styles/global.css`: design tokens, responsive layouts, article typography, reduced motion, and print styles.
- `gatsby-node.js`: schema, archive/tag pages, sitemap, RSS, and robots generation.

## Writing an article

```yaml
---
title: "A useful article"
description: "A concise summary for readers and search engines."
slug: "a-useful-article"
date: "2026-09-16"
updated: "2026-09-16" # Optional; use only for real content updates.
tags:
  - "Embedded Linux"
featuredImage: ./cover.png # Optional; cards have a fallback.
featuredImageAlt: "A short description of what the cover illustrates."
---
```

Use `##` for main sections and `###` for subsections. The page already renders its article title as the single `h1`. Heading links and the table of contents are generated automatically. Reading time is an estimate that includes code.

`CodeViewer` supports bash, JavaScript, JSON, CSS, Python, C++, and Dart highlighting. Other languages still display as plain code; register an additional Prism language in that component when needed.

All files in `src/blog` are publishable. Keep unfinished drafts outside that directory. Build validation rejects duplicate/invalid slugs, invalid dates, and tags that would generate conflicting URLs. Use a unique tag name (for example, `C Plus Plus` instead of combining `C++` and `C`).

## Post cover style

Follow [the cover style guide](docs/post-cover-style.md) for every new article. It includes the reusable generation prompt, reference image, naming convention, and review checklist. The [prompt archive](docs/post-cover-prompts.json) records the prompts used for the current three covers.

## Reader support

The support buttons are connected to https://ko-fi.com/brightbytesdev.

Set `supportUrl` in `config.js` to **your own public creator-page URL** on
Buy Me a Coffee, Ko-fi, or another HTTPS payment service. Set `supportLabel` to
the button text you want. `GATSBY_SUPPORT_URL` is an optional build-time override;
an explicitly empty override hides the links, even if `config.js` contains a URL.

Once configured and rebuilt, an optional support card appears after each article
and a coffee link appears in the footer. Empty or invalid URLs hide both. No
payment widget or third-party script loads while someone reads an article; the
link opens the provider in a new tab. Account setup and payouts are managed by
the provider, and the site never handles payment details.

Verify that the creator page belongs to you and is ready to accept payments
before publishing. Analytics records `support_click` only with consent, with
`placement` and (for article links) `article_slug`. This indicates interest,
not a completed payment. Register `placement` as an event-scoped custom dimension
if you want to compare footer and article clicks in GA4.

## Analytics

The public Measurement ID `G-F8YJQXQ4L5` is set in `config.js`. This is not a secret. To override it, copy `.env.example` to `.env.production`. An explicitly empty `GATSBY_GA_MEASUREMENT_ID` disables Analytics.

Analytics loads only when:

1. This is a production build.
2. The hostname matches `siteUrl` in `config.js`.
3. The visitor allows analytics.

Local previews never send events to the production property. The footer lets visitors change their choice. Revocation blocks future events and expires accessible GA cookies. Theme and text-size settings are local to the browser.

### Required GA4 dashboard setting

In the Web stream, open **Enhanced measurement → Page views → Advanced settings** and disable **Page changes based on browser history events**. This project sends page views for Gatsby navigation itself, with `send_page_view: false`, so automatic history tracking would double-count them.

To keep collection limited to the documented events, also disable unused Enhanced Measurement options (form interactions, site search, outbound clicks, file downloads, video engagement, and automatic scroll). Project repository clicks and article scroll milestones are already measured by the custom events below.

| Event              | Meaning                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `page_view`        | Initial visit or a change of pathname; section hash changes do not count.                                   |
| `article_progress` | The viewport reaches 25%, 50%, 75%, or 100% of article content. This is scroll depth, not proof of reading. |
| `copy_code`        | Successful copy of a code block.                                                                            |
| `share`            | Successful copy of an article link.                                                                         |
| `project_click`    | A click on an article’s repository link.                                                                    |

Custom events do not include search text or page query strings. Advertising personalization and Google signals are disabled. Register event-scoped custom dimensions such as `article_slug` and `language` in GA4 if you want to use them in reports. After deployment, allow Analytics on the production domain and check Realtime to confirm receipt; local tests only verify event logic.

## SEO and accessibility

Every page has a canonical URL, description, and social preview. Articles include `BlogPosting` JSON-LD and publication dates. Builds generate `/rss.xml`, `/sitemap.xml`, and `/robots.txt`; 404 and search pages are noindex and excluded from the sitemap. Submit the sitemap in Google Search Console after deployment.

The UI includes keyboard focus states, a skip link, labeled controls, system-aware light/dark themes, larger article text, horizontally scrollable code, and print styles. Animation uses CSS and respects `prefers-reduced-motion`; GSAP is not needed for these interactions.
