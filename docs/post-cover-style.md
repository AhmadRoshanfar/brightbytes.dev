# BrightBytes post cover style

This is the default visual style for every new post. Established September 2026.

## Art direction

Create a calm, tactile editorial 3D illustration of the article's central idea.
Use a small, clearly readable arrangement of two or three objects, with cream
frames, matte ceramic or powder-coated surfaces, and restrained technical detail.
The illustration should remain recognizable at thumbnail size.

- **Canvas:** landscape 16:10, target 1600 × 1000 pixels or larger. Slight source
  variations are acceptable; Gatsby renders all covers at 16:10.
- **Background:** seamless warm ivory `#faf9f6`, with a faint drafting dot grid.
- **Palette:** deep teal `#0f766e`, charcoal `#202a2a`, sage `#dce8de`.
  One small subject-specific accent is allowed: coral, muted cyan, or lavender.
- **Camera:** elevated three-quarter view, approximately 30 degrees down.
- **Light:** broad, soft light from the upper left; soft shadows toward the lower right.
- **Composition:** compact, centered; keep at least 10% breathing room around
  important objects. No essential information at the edges. Allow modest social crops.
- **Text:** no headings, captions, labels, fake code, watermarks, or logo badges.
  A simple meaningful interface or code symbol is acceptable.
- **Avoid:** neon, glossy plastic, noisy gradients, generic stock collages,
  excessive props, and unrelated decorative imagery.

## Reference and reusable prompt

Use [`epaper-photo-gui/cover.png`](../src/blog/epaper-photo-gui/cover.png) as a
**style reference only**, not as a subject to duplicate. Inspect it before passing
it to the image-generation tool. Use the built-in imagegen capability when available.

Replace the bracketed fields in this prompt:

```text
Create a finished BrightBytes.dev editorial blog cover for "[ARTICLE TITLE]".
The attached image is a STYLE REFERENCE ONLY. Match its tactile matte 3D rendering,
cream frames, warm ivory seamless studio ground with a faint drafting dot grid,
deep teal and sage palette, elevated three-quarter camera, and soft upper-left
daylight with lower-right shadows. Do not copy its subject.

Article idea: [ONE SENTENCE EXPLAINING WHAT THE READER LEARNS].
Subject: [TWO OR THREE CONCRETE OBJECTS AND HOW THEY RELATE].
Distinctive accent: [ONE SMALL SUBJECT-SPECIFIC ACCENT].

Landscape 16:10, target 1600x1000 pixels or larger. Compact balanced central
composition with at least 10% clear outer margin. Important objects safely inside
the middle 75% width and 70% height. Restrained plausible technical detail,
finely textured matte surfaces, crisp edges, gentle shadows, calm editorial feel.
Ivory #faf9f6, teal #0f766e, charcoal #202a2a, sage #dce8de dominate.
No text, titles, tiny fake labels, watermarks, borders, neon or busy backgrounds.
This is a conceptual illustration, not a literal product photo or screenshot.
Deliver one finished raster cover consistent with the reference series.
```

The exact prompts used for the first three covers are archived in
[`post-cover-prompts.json`](post-cover-prompts.json).

## Integration

1. Inspect the full image, then review it at card size. Check that the subject is
   relevant, recognizable and complete, and that it matches the series.
2. Copy the selected generation into `src/blog/<article-folder>/cover.png`.
   Preserve original generation files and factual screenshots.
3. Set `featuredImage: ./cover.png` and add a short `featuredImageAlt` describing
   the scene. Avoid implying a conceptual hardware illustration is an exact model.
4. Record the prompt and reference in `post-cover-prompts.json`.
5. Let Gatsby Image/Sharp generate responsive optimized images. Card images have
   empty alt text because their enclosing link already contains the post title;
   article and social images use the descriptive field.
6. Run `npm run build` and `npm run check:build`. Check archive, article and related
   cards at desktop and mobile widths for cropping and overflow. Preserve 16:10.

Generated covers do not replace instructional screenshots or wiring diagrams.
An image refresh alone does not change an article's `updated` date.
