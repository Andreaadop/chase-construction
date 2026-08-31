// scripts/publish-scheduled.mjs
// Publishes any post in scheduled-posts/ whose publishDate has arrived:
//   1. moves the HTML file into blog/ and flips its robots meta to index,follow
//   2. inserts a card at the top of blog/index.html (at the POSTS:INSERT marker)
//   3. appends a line to the Guides section of llms.txt
//   4. reruns build-projects.mjs so sitemap.xml picks up the new URL
// Intended to run daily from CI (see .github/workflows/publish-blog.yml).
// Override "today" for testing: PUBLISH_AS_OF=2026-09-07 node scripts/publish-scheduled.mjs
// No npm dependencies — Node stdlib only.

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const schedPath = path.join(root, 'scheduled-posts', 'schedule.json');

if (!existsSync(schedPath)) {
  console.log('No schedule.json — nothing to publish.');
  process.exit(0);
}

const today = process.env.PUBLISH_AS_OF || new Date().toISOString().slice(0, 10);
const schedule = JSON.parse(readFileSync(schedPath, 'utf8'));

const due = schedule.filter(p =>
  p.publishDate <= today && existsSync(path.join(root, 'scheduled-posts', p.file))
);

if (due.length === 0) {
  console.log(`Nothing due as of ${today}.`);
  process.exit(0);
}

const monthYear = (d) =>
  new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Oldest first so newer posts end up on top of the index.
due.sort((a, b) => a.publishDate.localeCompare(b.publishDate));

for (const p of due) {
  const src = path.join(root, 'scheduled-posts', p.file);
  const dest = path.join(root, 'blog', p.file);

  // 1. Move + flip robots meta
  let html = readFileSync(src, 'utf8');
  html = html.replace(
    '<meta name="robots" content="noindex, nofollow">',
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'
  );
  writeFileSync(dest, html);
  unlinkSync(src);

  // 2. Insert card into blog/index.html
  const idxPath = path.join(root, 'blog', 'index.html');
  let idx = readFileSync(idxPath, 'utf8');
  const marker = '<!-- POSTS:INSERT (newest posts are inserted below this line by scripts/publish-scheduled.mjs) -->';
  const card = `${marker}
    <a class="blog-card" href="${p.file}">
      <div class="blog-card-img">
        <img src="../company-photos/${p.image}" alt="${p.imageAlt}" width="1200" loading="lazy">
      </div>
      <div class="blog-card-body">
        <span class="blog-card-tag">${p.tag}</span>
        <h2 class="blog-card-title">${p.title}</h2>
        <p class="blog-card-excerpt">${p.excerpt}</p>
        <span class="blog-card-date">${monthYear(p.publishDate)}</span>
      </div>
    </a>`;
  if (!idx.includes(marker)) {
    console.error('POSTS:INSERT marker missing from blog/index.html — card not inserted for ' + p.file);
  } else if (idx.includes(`href="${p.file}"`)) {
    console.log(`Card for ${p.file} already present — skipping insert.`);
  } else {
    idx = idx.replace(marker, card);
    writeFileSync(idxPath, idx);
  }

  // 3. llms.txt Guides line
  const llmsPath = path.join(root, 'llms.txt');
  if (existsSync(llmsPath)) {
    let llms = readFileSync(llmsPath, 'utf8');
    const line = `- [${p.title}](https://www.chaseconstruction.org/blog/${p.file}): ${p.excerpt}`;
    if (!llms.includes(`/blog/${p.file}`)) {
      if (llms.includes('\n\n## Company')) {
        llms = llms.replace('\n\n## Company', `\n${line}\n\n## Company`);
        writeFileSync(llmsPath, llms);
      } else {
        console.error('Could not find "## Company" anchor in llms.txt — line not added for ' + p.file);
      }
    }
  }

  console.log(`Published blog/${p.file} (${p.publishDate})`);
}

// 4. Regenerate sitemap (auto-discovers blog/*.html)
execFileSync(process.execPath, [path.join(__dirname, 'build-projects.mjs')], { stdio: 'inherit' });
console.log(`Done — published ${due.length} post(s).`);
