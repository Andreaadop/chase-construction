// scripts/test-build-projects.mjs
// Smoke test: runs the build script and asserts the expected files exist
// and contain the expected key content.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

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

// Assertions are driven by projects-data.js so the test tracks the live project list
const projects = createRequire(import.meta.url)(path.join(root, 'projects-data.js'));
const first = projects[0];
const last = projects[projects.length - 1];

console.log('\nGallery checks:');
assert(existsSync(galleryPath), 'projects.html was generated');
const gallery = readFileSync(galleryPath, 'utf8');
assert(gallery.includes(first.name), 'gallery includes first project name');
assert(gallery.includes(last.name), 'gallery includes last project name');
assert(gallery.includes(first.hero), 'gallery references hero photo path');
assert(gallery.includes('href="projects/' + first.slug + '.html"'), 'gallery links to detail page');
assert(gallery.includes('class="cta-band"'), 'gallery includes mid-page CTA band');
assert(gallery.includes('class="closing"'), 'gallery includes closing CTA');

console.log('\nDetail page checks (' + first.slug + '):');
const detailPath = path.join(projectsDir, first.slug + '.html');
assert(existsSync(detailPath), 'detail page was generated');
const detail = readFileSync(detailPath, 'utf8');
assert(detail.includes('<title>' + first.name), 'detail page title contains project name');
assert(detail.includes(first.location), 'detail page contains location');
if (first.year) assert(detail.includes(String(first.year)), 'detail page contains year');
if (first.photos.length) assert(detail.includes(first.photos[0]), 'detail page references first additional photo');
assert(detail.includes('<meta name="description"'), 'detail page has meta description');
assert(detail.includes('property="og:image"'), 'detail page has OpenGraph image');

console.log('\nAll detail pages:');
const slugs = projects.map(p => p.slug);
for (const p of projects) {
  assert(existsSync(path.join(projectsDir, p.slug + '.html')), p.slug + '.html exists');
  for (const photo of [p.hero, ...p.photos]) {
    assert(existsSync(path.join(root, photo)), p.slug + ': ' + photo + ' exists on disk');
  }
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
