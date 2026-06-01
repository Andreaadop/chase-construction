// scripts/test-build-projects.mjs
// Smoke test: runs the build script and asserts the expected files exist
// and contain the expected key content.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error('  ✗ ' + message);
    process.exitCode = 1;
  } else {
    console.log('  ✓ ' + message);
  }
}

// Clean any previous build output so we know what we're testing
const galleryPath = path.join(root, 'projects.html');
const projectsDir = path.join(root, 'projects');
const sitemapPath = path.join(root, 'sitemap.xml');
if (existsSync(galleryPath)) rmSync(galleryPath);
if (existsSync(projectsDir)) rmSync(projectsDir, { recursive: true });
if (existsSync(sitemapPath)) rmSync(sitemapPath);

console.log('Running build script…');
execSync('node scripts/build-projects.mjs', { cwd: root, stdio: 'inherit' });

console.log('\nGallery checks:');
assert(existsSync(galleryPath), 'projects.html was generated');
const gallery = readFileSync(galleryPath, 'utf8');
assert(gallery.includes('Bellevue Lakeside Lodge'), 'gallery includes first project name');
assert(gallery.includes('Wood River Timber Frame'), 'gallery includes last project name');
assert(gallery.includes('project-photos/bellevue-lakeside-lodge/hero.jpg'), 'gallery references hero photo path');
assert(gallery.includes('href="projects/bellevue-lakeside-lodge.html"'), 'gallery links to detail page');
assert(gallery.includes('class="cta-band"'), 'gallery includes mid-page CTA band');
assert(gallery.includes('class="closing"'), 'gallery includes closing CTA');

console.log('\nDetail page checks (bellevue-lakeside-lodge):');
const detailPath = path.join(projectsDir, 'bellevue-lakeside-lodge.html');
assert(existsSync(detailPath), 'detail page was generated');
const detail = readFileSync(detailPath, 'utf8');
assert(detail.includes('<title>Bellevue Lakeside Lodge'), 'detail page title contains project name');
assert(detail.includes('Bellevue, ID'), 'detail page contains location');
assert(detail.includes('2024'), 'detail page contains year');
assert(detail.includes('hand-selected Douglas fir'), 'detail page contains story content');
assert(detail.includes('project-photos/bellevue-lakeside-lodge/01.jpg'), 'detail page references first additional photo');
assert(detail.includes('<meta name="description"'), 'detail page has meta description');
assert(detail.includes('property="og:image"'), 'detail page has OpenGraph image');

console.log('\nAll detail pages:');
const slugs = [
  'bellevue-lakeside-lodge', 'ketchum-ridge-estate', 'sun-valley-mountain-house',
  'hailey-heritage-restoration', 'conrad-family-addition', 'wood-river-timber-frame'
];
for (const slug of slugs) {
  assert(existsSync(path.join(projectsDir, slug + '.html')), slug + '.html exists');
}

console.log('\nSitemap:');
assert(existsSync(sitemapPath), 'sitemap.xml was generated');
const sitemap = readFileSync(sitemapPath, 'utf8');
for (const slug of slugs) {
  assert(sitemap.includes('/projects/' + slug + '.html'), 'sitemap includes ' + slug);
}
assert(sitemap.includes('/projects.html'), 'sitemap includes gallery');

if (process.exitCode === 1) {
  console.error('\n✗ Build script test FAILED');
  process.exit(1);
} else {
  console.log('\n✓ All assertions passed');
}
