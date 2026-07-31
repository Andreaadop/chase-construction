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
