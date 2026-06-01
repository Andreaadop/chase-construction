// scripts/build-projects.mjs
// Reads projects-data.js + the two templates, writes:
//   projects.html
//   projects/<slug>.html (one per project)
//   sitemap.xml (overwritten each run)
//
// No npm dependencies — Node stdlib only.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// ── Load data
const projects = require(path.join(root, 'projects-data.js'));
if (!Array.isArray(projects) || projects.length === 0) {
  console.error('projects-data.js produced no projects. Aborting.');
  process.exit(1);
}

// ── Load templates
const galleryTpl = readFileSync(path.join(root, 'templates/gallery.template.html'), 'utf8');
const projectTpl = readFileSync(path.join(root, 'templates/project.template.html'), 'utf8');

// ── HTML escape for fields that go into text contexts
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Render one gallery card
function renderCard(p, idx, total) {
  const num = String(idx + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');
  const rev = idx % 2 === 1 ? ' ed-item--rev' : '';
  return `
    <article class="ed-item reveal${rev}">
      <div class="ed-media">
        <img src="${p.hero}" alt="${esc(p.name)} — ${esc(p.location)}" loading="lazy">
        <span class="ed-num">${num} / ${totalStr}</span>
      </div>
      <div class="ed-meta">
        <span class="ed-eyebrow">${esc(p.service)}</span>
        <h2>${esc(p.name)}</h2>
        <div class="ed-loc">${esc(p.location)}<span class="dot">·</span>${p.year}</div>
        <div class="ed-rule"></div>
        <p class="ed-blurb">${esc(p.blurb)}</p>
        <a href="projects/${p.slug}.html" class="ed-cta">View Project <span class="arr">→</span></a>
      </div>
    </article>`;
}

// ── Render dividers between cards
function joinWithDividers(cards) {
  return cards.map((c, i) =>
    c + (i < cards.length - 1 ? '<div class="ed-divider"></div>' : '')
  ).join('\n');
}

// ── Build gallery
const total = projects.length;
const topCards = projects.slice(0, 3).map((p, i) => renderCard(p, i, total));
const bottomCards = projects.slice(3).map((p, i) => renderCard(p, i + 3, total));
const galleryHtml = galleryTpl
  .replace('{{PROJECTS_TOP_HTML}}', joinWithDividers(topCards))
  .replace('{{PROJECTS_BOTTOM_HTML}}', joinWithDividers(bottomCards));
writeFileSync(path.join(root, 'projects.html'), galleryHtml);
console.log('Wrote projects.html');

// ── Build detail pages
const projectsDir = path.join(root, 'projects');
if (!existsSync(projectsDir)) mkdirSync(projectsDir, { recursive: true });

for (const p of projects) {
  const storyHtml = p.story
    .split('\n\n')
    .map(para => `<p>${esc(para)}</p>`)
    .join('\n');
  const photosHtml = (p.photos || [])
    .map(src => `<figure><img src="../${src}" alt="${esc(p.name)} detail" loading="lazy"></figure>`)
    .join('\n');
  const metaDesc = `${p.name} — a ${p.service.toLowerCase()} build by Chase Construction LLC in ${p.location} (${p.year}). ${p.blurb}`.slice(0, 300);
  const ogImage = p.hero;
  const html = projectTpl
    .replaceAll('{{NAME}}', esc(p.name))
    .replaceAll('{{SERVICE}}', esc(p.service))
    .replaceAll('{{LOCATION}}', esc(p.location))
    .replaceAll('{{YEAR}}', String(p.year))
    .replaceAll('{{HERO}}', p.hero)
    .replaceAll('{{STORY_HTML}}', storyHtml)
    .replaceAll('{{PHOTOS_HTML}}', photosHtml)
    .replaceAll('{{META_DESCRIPTION}}', esc(metaDesc))
    .replaceAll('{{OG_IMAGE}}', ogImage)
    .replaceAll('{{SLUG}}', p.slug);
  writeFileSync(path.join(projectsDir, `${p.slug}.html`), html);
  console.log(`Wrote projects/${p.slug}.html`);
}

// ── Sitemap
const today = new Date().toISOString().slice(0, 10);
const base = 'https://chaseconstruction.org';
const otherPages = [
  '/index.html', '/about.html', '/contact.html', '/process.html',
  '/big-timber-framing.html', '/custom-log-homes.html',
  '/custom-log-finishes-siding.html', '/log-home-restorations.html',
  '/milling-and-more.html', '/traditional-framing.html'
];
const urls = [
  ...otherPages.map(p => ({ loc: base + p, priority: '0.8' })),
  { loc: base + '/projects.html', priority: '0.9' },
  ...projects.map(p => ({ loc: `${base}/projects/${p.slug}.html`, priority: '0.7' }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
console.log('Wrote sitemap.xml');

console.log(`\nBuilt ${projects.length} project pages + gallery + sitemap.`);
