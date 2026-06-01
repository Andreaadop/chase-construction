/* ──────────────────────────────────────────────────────────────────────────
   Chase Construction — Projects Data
   ──────────────────────────────────────────────────────────────────────────
   To add a new project:

     1. Drop your photos into a new folder:
          project-photos/<slug>/hero.jpg
          project-photos/<slug>/01.jpg
          project-photos/<slug>/02.jpg
          project-photos/<slug>/03.jpg

     2. Copy any project block below, paste it at the end of the array,
        and update every field (slug, name, location, year, service,
        blurb, hero, photos, story).

     3. Save this file, then double-click build-projects.cmd
        (or run: node scripts/build-projects.mjs).

     4. Commit and push.

   Required fields:
     slug      — URL segment, must be unique, lowercase, hyphens only
     name      — display name
     location  — "City, State"
     year      — 4-digit number
     service   — one of: "Log Home" | "Big Timber" | "Restoration"
                       | "Finishes" | "Milling"
     blurb     — 1–3 sentences for gallery cards
     hero      — path to featured photo
     photos    — array of additional photo paths for the detail page
     story     — paragraphs separated by "\n\n"
   ────────────────────────────────────────────────────────────────────────── */

const CHASE_PROJECTS = [
  {
    slug: "bellevue-lakeside-lodge",
    name: "Bellevue Lakeside Lodge",
    location: "Bellevue, ID",
    year: 2024,
    service: "Log Home",
    blurb: "A 5,200 sq ft custom log home overlooking the Big Wood River — hand-selected Douglas fir, full-scribe corners, and a great room built around the view.",
    hero: "project-photos/bellevue-lakeside-lodge/hero.jpg",
    photos: [
      "project-photos/bellevue-lakeside-lodge/01.jpg",
      "project-photos/bellevue-lakeside-lodge/02.jpg",
      "project-photos/bellevue-lakeside-lodge/03.jpg"
    ],
    story: "The Bellevue Lakeside Lodge began as a sketch on a napkin: a great room that opened entirely to the river. Eighteen months later, full-scribe Douglas fir walls anchor a 5,200 sq ft retreat designed for three generations.\n\nEvery log was hand-selected and dry-stacked on site. The owner — a retired architect from the Bay Area — managed the project from California, with weekly video walk-throughs and a single trusted point of contact on the ground."
  },
  {
    slug: "ketchum-ridge-estate",
    name: "Ketchum Ridge Estate",
    location: "Ketchum, ID",
    year: 2023,
    service: "Big Timber",
    blurb: "Hand-hewn timber framing for a multi-generational mountain retreat. Forty-two structural members, every joint cut by hand.",
    hero: "project-photos/ketchum-ridge-estate/hero.jpg",
    photos: [
      "project-photos/ketchum-ridge-estate/01.jpg",
      "project-photos/ketchum-ridge-estate/02.jpg",
      "project-photos/ketchum-ridge-estate/03.jpg"
    ],
    story: "Ketchum Ridge is a celebration of joinery. Forty-two structural timbers — Douglas fir, hand-hewn — are joined with traditional mortise-and-tenon connections held by oak pegs. No steel. No hidden hardware.\n\nThe great room ceiling rises to 28 feet, framed by a king-post truss that took three weeks to fit. From the lot's eastern edge you can see Bald Mountain on a clear day."
  },
  {
    slug: "sun-valley-mountain-house",
    name: "Sun Valley Mountain House",
    location: "Sun Valley, ID",
    year: 2023,
    service: "Log Home",
    blurb: "A ground-up build featuring reclaimed Douglas fir and locally milled lumber, designed to disappear into the treeline.",
    hero: "project-photos/sun-valley-mountain-house/hero.jpg",
    photos: [
      "project-photos/sun-valley-mountain-house/01.jpg",
      "project-photos/sun-valley-mountain-house/02.jpg",
      "project-photos/sun-valley-mountain-house/03.jpg"
    ],
    story: "The owners asked for a home that would 'disappear into the treeline.' We delivered a low-slung profile clad in reclaimed Douglas fir, with charred-cedar accents and a roof line that mirrors the ridge behind it.\n\nThe lumber was milled three miles from the build site. Every board can be traced to a specific stand of trees."
  },
  {
    slug: "hailey-heritage-restoration",
    name: "Hailey Heritage Restoration",
    location: "Hailey, ID",
    year: 2022,
    service: "Restoration",
    blurb: "Full structural restoration and re-chinking of a 1940s pioneer log home. We replaced 23 logs, restored the original hearth, and brought it back to life for the next generation.",
    hero: "project-photos/hailey-heritage-restoration/hero.jpg",
    photos: [
      "project-photos/hailey-heritage-restoration/01.jpg",
      "project-photos/hailey-heritage-restoration/02.jpg",
      "project-photos/hailey-heritage-restoration/03.jpg"
    ],
    story: "When the family bought the property in 2021, three of the south-facing logs had rotted through. We took the building down to its stone foundation, replaced 23 structural logs with matched Douglas fir, and re-chinked every seam using a flexible, breathable compound that respects the original aesthetic.\n\nThe hearth — the heart of the home since 1947 — was disassembled stone by stone and rebuilt. Same stones. Same place."
  },
  {
    slug: "conrad-family-addition",
    name: "Conrad Family Addition",
    location: "Bellevue, ID",
    year: 2022,
    service: "Finishes",
    blurb: "A 1,800 sq ft addition that blends seamlessly with a 25-year-old log structure — matched logs, matched finishes, matched soul.",
    hero: "project-photos/conrad-family-addition/hero.jpg",
    photos: [
      "project-photos/conrad-family-addition/01.jpg",
      "project-photos/conrad-family-addition/02.jpg",
      "project-photos/conrad-family-addition/03.jpg"
    ],
    story: "The Conrad family had outgrown their 1997 log home, but they didn't want to lose its character. We sourced matching Douglas fir from the same Idaho mill that supplied the original, hand-aged the finish to match weathered patina, and designed the new wing's roofline to read as if it had always been there.\n\nMost visitors can't tell where the original ends and the addition begins. That's the point."
  },
  {
    slug: "wood-river-timber-frame",
    name: "Wood River Timber Frame",
    location: "Bellevue, ID",
    year: 2021,
    service: "Big Timber",
    blurb: "Massive Douglas fir trusses anchor this open-concept timber frame. Built for a young family relocating from Austin.",
    hero: "project-photos/wood-river-timber-frame/hero.jpg",
    photos: [
      "project-photos/wood-river-timber-frame/01.jpg",
      "project-photos/wood-river-timber-frame/02.jpg",
      "project-photos/wood-river-timber-frame/03.jpg"
    ],
    story: "A family of five, relocating from Austin, wanted a home that felt like Idaho but lived like a modern open-concept house. We answered with a timber frame: massive Douglas fir trusses that frame a 1,600 sq ft open great room, with the kitchen, living, and dining areas all sharing one ceiling.\n\nThe trusses were raised by crane in a single day. The owners watched on a livestream from Texas."
  }
];

if (typeof window !== 'undefined') window.CHASE_PROJECTS = CHASE_PROJECTS;
if (typeof module !== 'undefined') module.exports = CHASE_PROJECTS;
