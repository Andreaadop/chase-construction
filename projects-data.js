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
    slug: "grand-entry-log-home",
    name: "Grand Entry Log Home",
    location: "Idaho",
    year: 1989,
    service: "Log Home",
    blurb: "A handcrafted log home built in 1989 — a triple-gable front, massive log trusses over a stone-walled entry, and chinked log walls that have carried Idaho winters for more than three decades.",
    hero: "project-photos/grand-entry-log-home/cover.jpg",
    photos: [
      "project-photos/grand-entry-log-home/01.jpg",
      "project-photos/grand-entry-log-home/02.jpg"
    ],
    story: "This home was built in 1989, and it is still standing square. Three gables face the drive, the center one carried on full-round log trusses over an entry walled in native stone. The log walls are chinked by hand, line after line, under a cedar-shake roof.\n\nOn the back side, stacked log decks step down the hillside on hand-peeled posts and rails — the kind of outdoor structure that only lasts decades when the joinery under it is right.\n\nMore than thirty Idaho winters later, the logs have deepened to honey and the home wears its age the way good log work should: visibly, and without apology."
  },
  {
    slug: "sun-valley-custom-log-home",
    name: "Sun Valley Custom Log Home",
    location: "Sun Valley, ID",
    year: null, // Older build — exact year not on record; intentionally omitted rather than guessed.
    service: "Log Home",
    blurb: "A custom log home built from the ground up in a Sun Valley aspen grove — full-scribe log walls, a steep snow-country gable, and a covered balcony with a hand-built lattice log railing over a two-bay garage.",
    hero: "project-photos/sun-valley-custom-log-home/cover.jpg",
    photos: [
      "project-photos/sun-valley-custom-log-home/front.jpg",
      "project-photos/sun-valley-custom-log-home/01.jpg",
      "project-photos/sun-valley-custom-log-home/02.jpg",
      "project-photos/sun-valley-custom-log-home/03.jpg",
      "project-photos/sun-valley-custom-log-home/04.jpg"
    ],
    story: "Chase built this log home from the ground up in an aspen grove. The walls are full log — scribed, stacked, and pinned by hand — carrying a steep gable roof sized for Sun Valley winters. Over the two-bay garage, a covered balcony steps out beneath the eave, its railing built from smaller logs notched into a lattice by hand.\n\nThe construction photos show the home before its finish: freshly peeled logs still pale, the balcony and railing going up while the aspens stood bare. Every post, beam, and baluster was cut and fitted on site.\n\nFinished and stained, the home settled into its setting — geranium boxes on the balcony rail, warm log walls, and the round-cut log ends that mark true handcrafted log work."
  },
  {
    slug: "mackay-log-home-restoration",
    name: "Mackay Log Home Restoration",
    location: "Mackay, ID",
    year: 2026,
    service: "Restoration",
    blurb: "Full restoration of a two-story log home beneath the Lost River Range — new standing-seam metal roof, refinished logs and chinking, new windows, and a gut interior remodel.",
    hero: "project-photos/mackay-log-home-restoration/hero.jpg",
    photos: [
      "project-photos/mackay-log-home-restoration/01.jpg",
      "project-photos/mackay-log-home-restoration/02.jpg",
      "project-photos/mackay-log-home-restoration/03.jpg",
      "project-photos/mackay-log-home-restoration/04.jpg"
    ],
    story: "The home came to us with a weathered cedar-shake roof and decades of sun on its logs. We stripped the shakes to the sheathing and replaced them with charcoal standing-seam metal, brought the log walls back to fresh wood, and renewed the chinking line by line.\n\nInside, the house was taken back to its log shell — new framing, plumbing, and electrical throughout, with new windows fitted into the original log openings."
  },
  {
    slug: "log-deck-balcony-repair",
    name: "Deck & Balcony Log Repair",
    location: "Idaho",
    year: 2026,
    service: "Restoration",
    blurb: "Structural log repair on a two-story deck and balcony — new hand-peeled posts, carrying beam, and joists fitted to the original home.",
    hero: "project-photos/log-deck-balcony-repair/hero.jpg",
    photos: [
      "project-photos/log-deck-balcony-repair/01.jpg",
      "project-photos/log-deck-balcony-repair/02.jpg",
      "project-photos/log-deck-balcony-repair/03.jpg"
    ],
    story: "Rot had taken the posts and carrying beam under this balcony. We replaced them with new hand-peeled logs — posts, beam, joists, and rail plates — scribed to the original structure. The new wood will be stained to match the home."
  },
  {
    slug: "timber-framed-pump-house",
    name: "Timber-Framed Pump House",
    location: "Idaho",
    year: 2026,
    service: "Framing",
    blurb: "A gable roof framed over a well house — hand-cut rafters with clean joinery, built on an existing steel frame.",
    hero: "project-photos/timber-framed-pump-house/hero.jpg",
    photos: [
      "project-photos/timber-framed-pump-house/01.jpg",
      "project-photos/timber-framed-pump-house/02.jpg",
      "project-photos/timber-framed-pump-house/03.jpg"
    ],
    story: "Even a pump house gets the full standard. Each rafter was cut and fitted by hand to land on the existing steel frame — plumb cuts, birdsmouths, and a straight ridge against the sky."
  }
];

if (typeof window !== 'undefined') window.CHASE_PROJECTS = CHASE_PROJECTS;
if (typeof module !== 'undefined') module.exports = CHASE_PROJECTS;
