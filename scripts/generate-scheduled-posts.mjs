// scripts/generate-scheduled-posts.mjs
// Writes scheduled blog posts into scheduled-posts/ + schedule.json.
// Posts carry a noindex robots meta until publish-scheduled.mjs moves them
// into blog/ on their publish date and flips robots to index.
// No npm dependencies — Node stdlib only.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'scheduled-posts');
if (!existsSync(outDir)) mkdirSync(outDir);

const posts = [
  {
    slug: 'log-home-restaining-signs-idaho',
    publishDate: '2026-09-07',
    tag: 'Maintenance',
    title: 'How to Tell When Your Log Home Needs Re-Staining',
    metaDescription: 'The four signs a log home needs re-staining — graying, chalking, blotchy color, and failing water beading — and why Idaho sun makes south-facing walls fail first. From Chase Construction, Sun Valley.',
    excerpt: 'Graying, chalking, blotchy color, water soaking in flat — the four signs your stain is done protecting the wood, and which walls fail first.',
    image: 'log-walls-prepped-for-stain-idaho.jpg',
    imageAlt: 'Log walls stripped back and prepped for new stain on an Idaho log home',
    imageCaption: 'Log walls stripped back to sound wood ahead of a new finish — the right way to reset a failed stain.',
    heroEyebrow: 'Log Home Maintenance',
    body: `
    <p>Stain doesn't fail all at once. It fades quietly, season by season, until one day the logs underneath are taking every storm bare. By the time most owners notice, the finish has been done protecting the wood for a year or more. Here are the signs we look for on <a href="../log-home-chinking-staining.html">log home staining</a> assessments across Sun Valley, Ketchum, and Hailey — so you can catch it while it's still a maintenance job.</p>

    <h2>The four signs your stain is failing</h2>
    <h3>1. The color has gone gray or silver</h3>
    <p>Graying is ultraviolet damage to the wood fibers themselves. It means the UV blockers in your stain are used up and sunlight is now breaking down the log surface directly. A little silvering on the sunniest wall is an early warning; widespread gray means the finish is gone.</p>
    <h3>2. Chalky residue when you rub the wood</h3>
    <p>Run your hand across the logs. If your palm comes away with a fine, pale powder, the stain's binders are breaking down and the finish is literally turning to dust. Chalking is one of the most reliable signs a re-stain is due — no ladder required to check it.</p>
    <h3>3. Blotchy, uneven color</h3>
    <p>When some sections hold color and others fade, the film is failing unevenly — usually where sun, snow splashback, or roof runoff hit hardest. Blotchiness means water is already penetrating the faded areas while the rest of the wall holds.</p>
    <h3>4. Water soaks in instead of beading</h3>
    <p>This is the test that settles it. Flick water at the logs. On a healthy finish it beads and rolls off. If it darkens the wood and soaks in flat, the water repellency is gone — and every rain and snowmelt after that is going into the logs.</p>

    <h2>Why south- and west-facing walls fail first</h2>
    <p>At the Wood River Valley's elevation, UV exposure is significantly more intense than at sea level. South- and west-facing walls take the full force of it, plus the biggest daily temperature swings. We routinely see homes where the south wall needs a full re-stain while the shaded north wall has years of life left. That's also why a good assessment prices walls individually instead of quoting a blanket re-do — you shouldn't pay to re-stain wood that's still protected.</p>

    <h2>What happens if you wait</h2>
    <p>Bare wood doesn't stay bare — it absorbs. Moisture cycles in and out with every freeze and thaw, opening surface checks wider each winter. Left long enough, that path leads to soft spots, rot, and <a href="../log-home-restorations.html">log restoration work</a> that costs many multiples of a re-stain. The economics of log home ownership are simple: finish maintenance is cheap, wood repair is not.</p>

    <h2>The re-staining cadence that works in Idaho</h2>
    <p>In our climate, plan on a stain inspection every 3–5 years and a re-treatment somewhere in the 5–8 year range, depending on the product and your exposure. If your home is coming up on that window — or it's already showing any of the four signs above — fall is the right time to get it assessed, before the snow flies.</p>
    <p>Chase Construction re-stains and re-chinks log homes across Sun Valley, Ketchum, Hailey, and Bellevue. Call <a href="tel:2088978100">208-897-8100</a> for an honest read on what your finish needs — and what it doesn't.</p>
`
  },
  {
    slug: 'log-home-winter-preparation-checklist',
    publishDate: '2026-09-21',
    tag: 'Seasonal Guide',
    title: 'Preparing Your Log Home for an Idaho Winter: A Fall Checklist',
    metaDescription: 'A log home builder’s fall checklist for Sun Valley winters: chinking inspection, stain check, drainage, roofline, and rot spots — what to check and when to call for help.',
    excerpt: 'The six things to check on your log home every fall — from chinking joints to snow splashback zones — before the first hard freeze.',
    image: 'log-home-winter-prep-sun-valley.jpg',
    imageAlt: 'Well-maintained custom log home in Sun Valley, Idaho ready for winter',
    imageCaption: 'A well-kept log home in the Sun Valley area. Fall maintenance is what keeps it looking like this in April.',
    heroEyebrow: 'Seasonal Guide',
    body: `
    <p>Idaho winters don't damage log homes directly — they exploit whatever was already weak in October. Water gets behind failed chinking, freezes, and pries it open wider. Snow piles against unsealed lower logs. By spring, a small problem has compounded. This is the checklist we'd run on our own homes every fall, in the order that matters.</p>

    <h2>The fall checklist</h2>
    <h3>1. Walk every chinking line</h3>
    <p>Look for cracks along the joints, sections pulling away from the logs, and gaps you can see daylight through. Failed chinking is the #1 winter vulnerability, because freeze-thaw actively makes it worse all season. If you find failures, deal with them before the freeze — our guide to <a href="log-home-chinking-cost-idaho.html">chinking costs</a> explains why spot repairs caught early are a fraction of the price.</p>
    <h3>2. Test the stain</h3>
    <p>Flick water on the sunniest wall. If it soaks in instead of beading, the logs are going into winter unprotected. Late fall staining is weather-dependent, so if the finish has failed, call sooner rather than later.</p>
    <h3>3. Clear roof drainage and gutters</h3>
    <p>Every gallon of snowmelt that overflows a clogged gutter runs down your log walls. Clean gutters and downspouts, and check that they discharge away from the foundation — not against your bottom courses.</p>
    <h3>4. Check the splashback zone</h3>
    <p>The bottom two or three log courses take snow-bank contact and roof-drip splash all winter. Probe them for soft spots, look for dark staining, and make sure snow won't pile directly against wood. This is where we find most of the rot in <a href="../log-home-restorations.html">restoration work</a>.</p>
    <h3>5. Look up at the roofline</h3>
    <p>Check for shifted flashing, damaged shingles or panels, and gaps where ice dams could push water under the roof edge and down into log walls. Binoculars are fine — the point is to look before the roof is under three feet of snow.</p>
    <h3>6. Book repairs while the weather holds</h3>
    <p>Chinking and staining both need decent temperatures to cure properly. In the Wood River Valley that window closes fast — a failure found in November may have to wait until spring, protected by little more than a tarp. Found in September, it's fixed in a week.</p>

    <h2>If you're not here to check it</h2>
    <p>Many of the homes we maintain belong to <a href="../building-from-out-of-state.html">out-of-state owners</a>. We do fall walk-throughs, document everything with photos, and handle whatever the home needs before winter — so the version of the house you find at Christmas is the one you left in September.</p>
    <p>Want the checklist run by the people who build these homes? Call <a href="tel:2088978100">208-897-8100</a> and get on the fall schedule.</p>
`
  },
  {
    slug: 'timber-frame-vs-log-home',
    publishDate: '2026-10-05',
    tag: 'Building Guide',
    title: 'Timber Frame vs. Log Home: What’s the Difference?',
    metaDescription: 'Timber frame and log homes are built completely differently — skeleton vs. solid walls. An Idaho builder of both explains structure, look, maintenance, and how to choose.',
    excerpt: 'One is a skeleton of heavy beams, the other is solid wood walls. A builder of both explains how they differ in structure, look, and maintenance.',
    image: 'timber-frame-trusses-idaho.jpg',
    imageAlt: 'Heavy timber frame trusses inside a luxury home in Idaho built by Chase Construction',
    imageCaption: 'Heavy timber trusses on one of our Idaho builds — the frame is the architecture.',
    heroEyebrow: 'Building Guide',
    body: `
    <p>People use "timber frame" and "log home" interchangeably, but structurally they're opposites. We build both across the Sun Valley area — <a href="../big-timber-framing.html">big timber framing</a> and <a href="../custom-log-homes.html">custom log homes</a> — and choosing between them shapes everything from the look of your great room to your maintenance calendar for the next thirty years.</p>

    <h2>The structural difference</h2>
    <p>A <strong>timber frame home</strong> is a skeleton: heavy posts, beams, and trusses joined into a frame that carries the structure. The walls between the timbers are conventional — insulated, sheathed, finished however you like. The timber is the architecture you see inside: exposed trusses, big spans, vaulted ceilings.</p>
    <p>A <strong>log home</strong> has no skeleton — the walls themselves are the structure. Stacked logs carry the loads, and the wood is both the exterior siding and the interior finish. It's the most honest form of wood construction there is: what you see is what's holding the roof up.</p>

    <h2>How they live differently</h2>
    <h3>Look and feel</h3>
    <p>Timber frame reads as craftsmanship in the ceiling — dramatic trusses over otherwise conventional (often bright, modern) walls. Log construction wraps you in wood on every surface. Neither is better; they're different answers to what you want a mountain home to feel like.</p>
    <h3>Insulation and walls</h3>
    <p>Timber frame walls are built like any modern high-performance wall, so hitting aggressive energy targets is straightforward. Log walls insulate through the mass of the wood itself, which performs well when the logs are properly sealed — which brings us to maintenance.</p>
    <h3>Maintenance</h3>
    <p>This is the biggest practical difference. Log walls are exterior wood, and they need what exterior wood needs in Idaho: <a href="../log-home-chinking-staining.html">stain and chinking maintenance</a> on a regular cycle. A timber frame home's exterior is whatever siding you chose, with the timbers protected inside. If low exterior maintenance matters to you, that weighs toward timber frame; if the solid-log character is why you're building, the maintenance is simply part of ownership — and manageable with a good cadence.</p>
    <h3>Settling and movement</h3>
    <p>Log walls settle as the wood seasons — good log builders engineer for it around windows, doors, and plumbing. Timber frames move far less; the joinery locks the frame, and the conventional walls behave like any custom home.</p>

    <h2>The hybrid answer</h2>
    <p>Plenty of the homes we build in the valley are both: timber-framed great rooms and entries for the drama of exposed trusses, with log or <a href="../custom-log-finishes-siding.html">log-sided</a> wings for the character. If you're torn between the two looks, a hybrid is usually the honest answer — you put each construction type where it does what it's best at.</p>

    <h2>Which one is right for your build?</h2>
    <p>It comes down to three questions: what do you want to see when you stand in the great room, how much exterior maintenance are you signing up for, and what does your site and budget favor? Those are conversations worth having with a builder who does both and doesn't need to steer you toward the one they know. That's us: <a href="tel:2088978100">208-897-8100</a>.</p>
`
  },
  {
    slug: 'how-long-to-build-custom-log-home-sun-valley',
    publishDate: '2026-10-19',
    tag: 'Planning',
    title: 'How Long Does It Take to Build a Custom Log Home in Sun Valley?',
    metaDescription: 'Realistic custom log home timelines in Sun Valley, Idaho: design and permitting, the short mountain building season, log work, and why most builds run 12–18+ months.',
    excerpt: 'Design, Blaine County permitting, a short mountain building season, and the log work itself — where the time really goes on a custom build.',
    image: 'log-home-construction-crane-sun-valley.jpg',
    imageAlt: 'Crane lifting a replacement log into place on a log home job site near Sun Valley, Idaho',
    imageCaption: 'Setting a log by crane on one of our Wood River Valley job sites.',
    heroEyebrow: 'Planning a Build',
    body: `
    <p>The honest answer for a custom log home in the Sun Valley area: most run <strong>12 to 18 months of construction</strong>, with larger or more complex homes going beyond that — plus design and permitting time before a shovel touches dirt. Here's where the time actually goes, and what the mountain calendar does to it.</p>

    <h2>Phase by phase</h2>
    <h3>Design and permitting (before construction)</h3>
    <p>Custom design, engineering, and permitting commonly take several months to a year depending on the complexity of the home and the review queue. Mountain-town jurisdictions like Blaine County and the cities of Ketchum, Hailey, and Sun Valley have real review processes — hillside ordinances, design review, snow-load engineering. Starting this in fall or winter puts you in position to break ground when the site opens up.</p>
    <h3>Site work and foundation</h3>
    <p>Excavation and foundation want thawed, workable ground — realistically late spring through fall up here. This phase typically runs a few months, longer on steep or rocky sites.</p>
    <h3>Log work and dry-in</h3>
    <p>Stacking log walls or raising a timber frame is the most visible stretch of the build, and the goal that drives the whole schedule is <em>dry-in before winter</em> — roof on, envelope closed, weather out. Hit that, and winter becomes productive interior time. Miss it, and the schedule can lose months, not weeks.</p>
    <h3>Interior through the winter</h3>
    <p>Once the home is dried in, mechanical, electrical, finishes, and cabinetry proceed through the cold months. On a well-sequenced build, winter isn't downtime at all — it's when the inside of the house happens.</p>

    <h2>What makes Sun Valley different</h2>
    <p>Two things: a short exterior season and a busy trade market. The valley's best subcontractors book out well in advance, and everyone is trying to pour foundations and close roofs in the same six warm months. A builder's real schedule skill here isn't optimism — it's sequencing: locking trades early, ordering long-lead materials before they're needed, and building the calendar backward from dry-in. That's a big part of <a href="../process.html">how we run every project</a>.</p>

    <h2>Can you speed it up?</h2>
    <p>Some. Decisive selections (finishes, fixtures, windows) prevent the most common delays, and starting design a season earlier than feels necessary is the cheapest schedule insurance there is. What you shouldn't compress is the log work itself — rushed joinery and sealing in a freeze-thaw climate is how homes end up needing restoration a decade early.</p>

    <h2>Building it from somewhere else?</h2>
    <p>Most of our clients don't live here while their home is built. We run the whole project with photo updates, clear decision points, and one point of contact — the full picture is on our <a href="../building-from-out-of-state.html">out-of-state clients</a> page. If you're planning a build and want a realistic timeline for your site and scope, call <a href="tel:2088978100">208-897-8100</a> — we'll walk you through it phase by phase.</p>
`
  },
  {
    slug: 'sun-valley-climate-log-homes',
    publishDate: '2026-10-31',
    tag: 'Maintenance',
    title: 'What Sun Valley’s Climate Does to Log Homes (and How to Protect Yours)',
    metaDescription: 'High-altitude UV, hard freeze-thaw cycles, dry summers, and heavy snow — what the Wood River Valley climate does to log walls, and the protection system that keeps them sound.',
    excerpt: 'High-altitude UV, freeze-thaw, bone-dry summers, and snowload — the four forces working on your logs, and the system that keeps them sound.',
    image: 'log-home-idaho-mountain-climate.jpg',
    imageAlt: 'Log home beneath a rocky crag in the Idaho mountains, exposed to high-altitude sun and weather',
    imageCaption: 'Idaho mountain exposure in one frame: intense sun, big temperature swings, and weather coming off the rock.',
    heroEyebrow: 'Log Home Maintenance',
    body: `
    <p>Log homes were made for this landscape — but this landscape works on them harder than almost anywhere else in the country. After decades of building and restoring log homes in the Wood River Valley, we can usually tell what a home has been through before we're out of the truck. Here are the four forces at work on your logs, and what actually protects against them.</p>

    <h2>The four forces</h2>
    <h3>High-altitude UV</h3>
    <p>At 5,000–6,000 feet, there's simply less atmosphere between the sun and your logs, so UV hits harder than the same hours of sun at sea level. UV is what breaks down stain and then the wood surface itself — it's why south- and west-facing walls gray out years before the rest of the home, and why stain up here needs re-treatment on a 5–8 year cycle rather than the longer intervals you'd get away with elsewhere.</p>
    <h3>Freeze-thaw cycling</h3>
    <p>Valley winters swing across the freezing line over and over. Every crack, check, and chinking gap that holds moisture becomes a small hydraulic jack: water in, freeze, expand, widen, repeat. This is what kills failed chinking fast, and it's why we tell owners a chinking gap found in fall is urgent — winter won't leave it the size it is now.</p>
    <h3>Bone-dry summers</h3>
    <p>Single-digit humidity through late summer pulls moisture out of logs, opening surface checks. The checking itself is normal wood behavior — but every check that opens on a top-facing surface is a future water catch if the finish isn't maintained.</p>
    <h3>Snow against the wood</h3>
    <p>Months of snow piled against bottom courses, plus roof-drip splashback, keep the lowest logs wetter than everything above. That's why nearly every <a href="../log-home-restorations.html">restoration</a> we do involves the bottom two or three courses — the splashback zone is where log homes rot first.</p>

    <h2>The protection system</h2>
    <p>None of these forces is a problem for a log home that's maintained as a system:</p>
    <ul>
      <li><strong>Stain</strong> handles UV and sheds water — inspected every 3–5 years, renewed at 5–8. See the signs it's failing in our <a href="log-home-restaining-signs-idaho.html">re-staining guide</a>.</li>
      <li><strong>Chinking</strong> keeps the joints sealed through log movement — checked every fall, repaired before winter, not after.</li>
      <li><strong>Drainage and clearance</strong> keep the splashback zone survivable — gutters that work, grade that sheds, snow managed away from the walls.</li>
      <li><strong>A fall inspection</strong> ties it together — every year, before the freeze, by someone who knows what failing looks like.</li>
    </ul>
    <p>Do those four things and a log home in this valley lasts generations — we restore 40- and 50-year-old homes that prove it. Skip them for a decade and the climate collects.</p>

    <h2>Get ahead of it</h2>
    <p>If you don't know where your home stands, that's what an assessment is for. We walk the whole structure — <a href="../log-home-chinking-staining.html">chinking, stain</a>, splashback zone, roofline — and tell you what needs attention now, what can wait, and what's fine. Call <a href="tel:2088978100">208-897-8100</a> before the snow settles in.</p>
`
  }
];

const template = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NXVXLDKW');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${p.metaDescription}">
  <title>${p.title} | Chase Construction</title>
  <meta property="og:title" content="${p.title}">
  <meta property="og:description" content="${p.excerpt}">
  <meta property="og:image" content="https://www.chaseconstruction.org/company-photos/${p.image}">
  <meta property="og:type" content="article">
  <link rel="canonical" href="https://www.chaseconstruction.org/blog/${p.slug}.html">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../shared.css">
  <style>
    .post-hero { padding: 180px 8vw 64px; background: var(--green-d); color: #fff; }
    .post-hero-inner { max-width: 780px; margin: 0 auto; }
    .post-h1 { font-size: clamp(34px, 4.5vw, 56px); line-height: 1.08; letter-spacing: -0.01em; margin: 18px 0 24px; }
    .post-meta { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--beige); }
    .post-body-wrap { padding: 72px 8vw 40px; }
    .post-body { max-width: 720px; margin: 0 auto; }
    .post-body p { font-size: 16.5px; line-height: 1.8; color: var(--text-mid, #4a3f38); margin-bottom: 26px; }
    .post-body h2 { font-size: clamp(26px, 3vw, 34px); line-height: 1.15; margin: 56px 0 20px; color: var(--ink); }
    .post-body h3 { font-size: 20px; margin: 36px 0 14px; color: var(--ink); }
    .post-body ul { margin: 0 0 26px 22px; }
    .post-body li { font-size: 16.5px; line-height: 1.8; color: var(--text-mid, #4a3f38); margin-bottom: 10px; }
    .post-body a { color: var(--green); text-decoration: underline; text-underline-offset: 3px; }
    .post-body a:hover { color: var(--green-d); }
    .post-figure { margin: 40px 0; }
    .post-figure img { width: 100%; height: auto; border-radius: 6px; display: block; }
    .post-figure figcaption { font-size: 13px; color: #7a6e66; margin-top: 10px; letter-spacing: 0.02em; }
    .post-callout { border-left: 3px solid var(--green); background: var(--linen); padding: 24px 28px; margin: 36px 0; border-radius: 0 6px 6px 0; }
    .post-callout p { margin: 0; font-size: 15.5px; }
    @media (max-width: 768px) {
      .post-hero { padding: 140px 6vw 48px; }
      .post-body-wrap { padding: 56px 6vw 24px; }
    }
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(p.title)},
    "description": ${JSON.stringify(p.excerpt)},
    "image": "https://www.chaseconstruction.org/company-photos/${p.image}",
    "datePublished": "${p.publishDate}",
    "dateModified": "${p.publishDate}",
    "author": {
      "@type": "Organization",
      "name": "Chase Construction LLC",
      "url": "https://www.chaseconstruction.org/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chase Construction LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chaseconstruction.org/brand-logo/logo-main.svg"
      }
    },
    "mainEntityOfPage": "https://www.chaseconstruction.org/blog/${p.slug}.html"
  }
  </script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXVXLDKW"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

<nav id="nav" role="navigation" aria-label="Main navigation" class="scrolled">
  <a href="../index.html" aria-label="Chase Construction home">
    <img src="../brand-logo/logo-main.svg" alt="Chase Construction LLC" class="nav-logo" id="nav-logo">
  </a>
  <div class="nav-links">
    <div class="nav-dropdown">
      <button class="nav-link nav-link--drop" id="services-btn" aria-haspopup="true" aria-expanded="false">
        Services <span class="drop-icon" aria-hidden="true"></span>
      </button>
      <div class="nav-dropdown-menu" id="services-menu">
        <a href="../custom-log-homes.html">Custom Log Homes</a>
        <a href="../big-timber-framing.html">Big Timber Framing</a>
        <a href="../traditional-framing.html">Traditional Framing</a>
        <a href="../log-home-restorations.html">Log Home Restorations</a>
        <a href="../log-home-chinking-staining.html">Chinking &amp; Staining</a>
        <a href="../custom-log-finishes-siding.html">Custom Log Finishes &amp; Siding</a>
        <a href="../milling-and-more.html">Milling &amp; More</a>
        <a href="../building-from-out-of-state.html">Out-of-State Clients</a>
      </div>
    </div>
    <a href="../projects.html" class="nav-link">Projects</a>
    <a href="../process.html" class="nav-link">Process</a>
    <a href="index.html" class="nav-link">Blog</a>
    <a href="../about.html" class="nav-link">About</a>
  </div>
  <div class="nav-right">
    <a href="tel:2088978100" class="nav-phone">208-897-8100</a>
    <a href="../contact.html" class="nav-cta">Start Your Build</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-mobile" id="nav-mobile" aria-hidden="true">
  <div class="nav-mobile-head">
    <img src="../brand-logo/logo-white.svg" class="nav-mobile-logo" alt="Chase Construction">
    <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">&#x2715;</button>
  </div>
  <nav class="nav-mobile-links">
    <a href="../index.html">Home</a>
    <span class="nav-mobile-label">Services</span>
    <a href="../custom-log-homes.html" class="nav-mobile-sub">Custom Log Homes</a>
    <a href="../big-timber-framing.html" class="nav-mobile-sub">Big Timber Framing</a>
    <a href="../traditional-framing.html" class="nav-mobile-sub">Traditional Framing</a>
    <a href="../log-home-restorations.html" class="nav-mobile-sub">Log Home Restorations</a>
    <a href="../log-home-chinking-staining.html" class="nav-mobile-sub">Chinking &amp; Staining</a>
    <a href="../custom-log-finishes-siding.html" class="nav-mobile-sub">Custom Log Finishes &amp; Siding</a>
    <a href="../milling-and-more.html" class="nav-mobile-sub">Milling &amp; More</a>
    <a href="../building-from-out-of-state.html" class="nav-mobile-sub">Out-of-State Clients</a>
    <a href="../projects.html">Projects</a>
    <a href="../process.html">Process</a>
    <a href="index.html">Blog</a>
    <a href="../about.html">About</a>
    <a href="../contact.html" class="nav-mobile-cta">Start Your Build →</a>
  </nav>
</div>

<main>
<header class="post-hero">
  <div class="post-hero-inner">
    <span class="eyebrow eyebrow-light">${p.heroEyebrow}</span>
    <h1 class="post-h1">${p.title}</h1>
    <p class="post-meta">Chase Construction · Sun Valley, Idaho · ${new Date(p.publishDate + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
  </div>
</header>

<div class="post-body-wrap">
  <article class="post-body">
${p.body.replace(/^\s*<p>/, `    <p>`).trimEnd().replace(/<\/p>\n\n/, `</p>

    <figure class="post-figure">
      <img src="../company-photos/${p.image}" alt="${p.imageAlt}" width="1200" loading="lazy">
      <figcaption>${p.imageCaption}</figcaption>
    </figure>
`)}
  </article>
</div>

<!-- CTA -->
<section class="pg-cta">
  <div class="pg-cta-inner">
    <span class="eyebrow pg-cta-eyebrow reveal">Talk to the Builder</span>
    <h2 class="pg-cta-h2 reveal d1">Straight answers about<br>your log home.</h2>
    <p class="pg-cta-body reveal d2">Chinking, staining, restoration, or a new build — we'll tell you what it needs and what it doesn't.</p>
    <a href="../contact.html" class="btn-p reveal d3">Get in Touch</a>
  </div>
</section>
</main>

<footer>
  <div class="foot-inner">
    <img src="../brand-logo/logo-white.svg" alt="Chase Construction LLC" class="foot-logo">
    <div class="foot-info">
      Bellevue, Idaho &nbsp;·&nbsp; Serving Sun Valley, Ketchum &amp; Hailey<br>
      <a href="tel:2088978100">208-897-8100</a>
    </div>
    <div class="foot-copy">&copy; 2025 Chase Construction LLC</div>
  </div>
</footer>

<script>
(function() {
  'use strict';
  var els = document.querySelectorAll('.reveal, .reveal-scale, .h-rule');
  function check() {
    var wh = window.innerHeight;
    els.forEach(function(el) {
      if (el.getBoundingClientRect().top < wh * 0.88) el.classList.add('in');
    });
  }
  window.addEventListener('scroll', check, { passive: true });
  check();

  var servicesBtn = document.getElementById('services-btn');
  var servicesDrop = servicesBtn ? servicesBtn.closest('.nav-dropdown') : null;
  if (servicesBtn && servicesDrop) {
    servicesBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var open = servicesDrop.classList.toggle('open');
      servicesBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function() {
      servicesDrop.classList.remove('open');
      servicesBtn.setAttribute('aria-expanded', 'false');
    });
  }
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');
  var mobileClose = document.getElementById('nav-mobile-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
})();
</script>
<script src="/js/inspection-popup.js" defer></script>
</body>
</html>
`;

for (const p of posts) {
  writeFileSync(path.join(outDir, `${p.slug}.html`), template(p));
  console.log(`Wrote scheduled-posts/${p.slug}.html (publish ${p.publishDate})`);
}

const schedule = posts.map(p => ({
  file: `${p.slug}.html`,
  publishDate: p.publishDate,
  title: p.title,
  tag: p.tag,
  excerpt: p.excerpt,
  image: p.image,
  imageAlt: p.imageAlt
}));
writeFileSync(path.join(outDir, 'schedule.json'), JSON.stringify(schedule, null, 2) + '\n');
console.log('Wrote scheduled-posts/schedule.json');
