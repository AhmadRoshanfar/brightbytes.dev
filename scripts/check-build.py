"""Validate the actual static output, including SEO, internal links, and feeds."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path('public')
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path = path; self.links = []; self.ids = set(); self.h1 = 0; self.meta = {}; self.canonical = []; self.scripts = []; self.json_buffer = None
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json': self.json_buffer = ''
    def handle_data(self, text):
        if self.json_buffer is not None: self.json_buffer += text
    def handle_endtag(self, tag):
        if tag == 'script' and self.json_buffer is not None:
            self.scripts.append(json.loads(self.json_buffer)); self.json_buffer = None

pages = {path: Page(path) for path in ROOT.rglob('*.html') if path.is_file() and "_gatsby" not in path.parts and "page-data" not in path.parts}
assert pages, 'No HTML output found'
for path, page in pages.items():
    assert page.h1 == 1, f'{path}: expected exactly one h1, found {page.h1}'
    assert page.meta.get('description'), f'{path}: missing description'
    assert len(page.canonical) == 1 and page.canonical[0].startswith('https://brightbytes.dev/'), f'{path}: missing canonical'
    assert page.meta.get('og:image') and page.meta.get('twitter:card'), f'{path}: missing share metadata'
    assert page.scripts, f'{path}: missing JSON-LD'
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc or href.startswith('mailto:'): continue
        target = (ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/') else (path.parent / unquote(url.path)) if url.path else path
        if target.is_dir(): target /= 'index.html'
        assert target.exists(), f'{path}: broken link {href}'
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f'{path}: broken anchor {href}'
    if path.parent.parent == ROOT / 'blog':
        schema = page.scripts[0]
        assert schema['@type'] == 'BlogPosting' and schema.get('datePublished'), f'{path}: invalid article schema'

rss = ET.parse(ROOT / 'rss.xml').getroot()
items = rss.findall('./channel/item')
article_pages = [p for p in pages if p.parent.parent == ROOT / 'blog']
assert len(items) == len(article_pages), 'RSS/article count mismatch'
sitemap = ET.parse(ROOT / 'sitemap.xml').getroot()
locations = [node.text for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(locations) == len(set(locations)), 'Duplicate sitemap URLs'
assert not any('404' in url or '/search/' in url for url in locations), 'Non-indexable pages in sitemap'
assert 'Sitemap: https://brightbytes.dev/sitemap.xml' in (ROOT / 'robots.txt').read_text()
assert (ROOT / 'social-card.png').exists()
assert (ROOT / 'CNAME').read_text().strip() == 'brightbytes.dev'
print(f'Passed: {len(pages)} pages, {len(article_pages)} articles, internal links/anchors, SEO, RSS, sitemap, robots, custom domain.')
