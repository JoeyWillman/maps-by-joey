/* =========================================================================
   CONTENT.JS — everything you'd want to edit lives in this one file.
   Add, remove, or change entries in the arrays below and the site updates
   automatically. You should not need to touch index.html, style.css, or
   main.js for ordinary content changes.
   ========================================================================= */

/* ---------- SITE-WIDE ---------- */
const SITE = {
  wordmark: "Maps by Joey",
  // The line under the big banner on the home screen.
  heroTagline:
    "",
  footerCopyright: "© 2026 Joseph Willman",
};

/* ---------- NAV / ICON SCREEN -----------
   This ONE list drives the top nav bar, the mobile menu, AND the icon
   screen you see after the down arrow on the home screen. Reorder, rename,
   re-icon, add, or remove an entry here and it updates everywhere.
   - key: internal id, also used in the URL (#/<key>) — keep it one word, lowercase
   - label: what's shown to visitors
   - icon: path to the icon image used on the icon screen
   - screen: which screen this nav item opens (must match a key in SCREENS below,
             normally the same as `key`) */
const NAV_ITEMS = [
  { key: "maps", label: "Maps", icon: "assets/icons/map.png", screen: "maps" },
  { key: "timeline", label: "Fieldwork", icon: "assets/icons/compass.png", screen: "timeline" },
  { key: "journal", label: "Field Notes", icon: "assets/icons/camera.png", screen: "journal" },
  { key: "about", label: "About", icon: "assets/icons/bio.png", screen: "about" },
];

/* ---------- MAPS ----------
   Each map is a card in the gallery. Click it to open the full detail view.

   - id: short unique slug, used in the URL (#/maps/<id>) — lowercase, dashes only
   - title / cat: shown on the card and the detail page
   - photo: the image used both for the framed thumbnail AND the detail view.
            Swap in a real image any time — just change this path.
   - frameShape: one of "oval" | "hex" | "square" | "wide" | "tall"
            (purely decorative — picks which hand-drawn frame wraps the thumbnail)
   - description: shown on the detail page. Write as much as you want.
   - link: OPTIONAL. If set, the detail page shows a "View Live Map" button
           that opens this URL in a new tab. Delete the line (or set to null)
           to hide the button.
   - embed: OPTIONAL. If set, the detail page shows it in an embedded iframe
           in addition to the link button. You can paste either a bare URL
           (it gets wrapped in an iframe for you) OR the full <iframe>
           "embed code" snippet some map tools give you (e.g. Google My
           Maps' or ArcGIS's "Embed" dialog) — both work, paste whichever
           you were given. Delete the line (or set to null) to hide it.

   To add a new map: copy one of the blocks below, give it a new unique id,
   and fill in the fields. To remove one, delete its block.
*/
const MAPS = [
  {
    id: "cct_kiosk",
    title: "Clear Creek Trail Kiosk Maps",
    cat: "Kiosk Maps",
    photo: "assets/photos/maps/cct_kiosk.jpg",
    frameShape: "tall",
    description:
      "A set of ten kiosk maps for the Clear Creek Trail in Silverdale, WA. Clear Creek Trail is a urban hiking trail that winds through the heart of the Silverdale and is enjoyed by thousands of visitors each year.",
    link: null,
    embed: null,
  },
  {
    id: "cct_run",
    title: "Clear Creek Trail Run",
    cat: "Race Map",
    photo: "assets/photos/maps/cct_run.jpg",
    frameShape: "oval",
    description:
      "A map created for the Clear Creek Trail Run, a casual run and walk event on the Clear Creek Trail in Silverdale, WA. The map shows the race course, aid stations, and other important information for runners and spectators.",
    link: null,
    embed: null,
  },
];

/* ---------- TIMELINE: PAID WORK ----------
   - dates / org / role / location / blurb: shown for each entry
   - icon: the small hand-drawn icon shown on the trail
   Newest should stay at the top. Copy a block to add a new role. */
const JOBS = [
  {
    dates: "Jan 2026 – Present",
    org: "Great Peninsula Conservancy",
    role: "Community Stewardship Fellow & AmeriCorps VISTA",
    location: "Bremerton, WA",
    blurb:
      "Preserve stewardship, visitor kiosk maps, and school outreach across GPC's conserved lands.",
    icon: "assets/icons/timeline/gpc-orca.png",
  },
  {
    dates: "Summer 2024, May–Jul 2025",
    org: "Adirondack Land Trust",
    role: "Stewardship / GIS Technician & Contractor",
    location: "Adirondacks, NY", // best guess — confirm exact office location
    blurb:
      "Trail maintenance, conservation easement mapping, and donor-facing cartography in ArcGIS Pro.",
    icon: "assets/icons/timeline/adirondack-trailmarker.png",
  },
  {
    dates: "Sep 2023 – May 2024",
    org: "USDA Rural Development",
    role: "Virtual Student Federal Service Intern",
    location: "Remote",
    blurb: "Built and launched public-facing geospatial maps for the agency.",
    icon: "assets/icons/timeline/usda-stamp.png",
  },
  {
    dates: "Summer 2023",
    org: "Fripp Island Resort",
    role: "Naturalist",
    location: "Fripp Island, SC",
    blurb:
      "Ran an independent alligator study with camera traps and GIS, led visitor education programs.",
    icon: "assets/icons/timeline/fripp-gator.png",
  },
  {
    dates: "May 2022 – May 2023",
    org: "Orrock Lab, UW–Madison",
    role: "Field Technician & Research Assistant",
    location: "Madison, WI",
    blurb:
      "Invasive species removal and field data collection across Wisconsin ecosystems.",
    icon: "assets/icons/timeline/orrock-deer.png",
  },
  {
    dates: "Summer 2022",
    org: "Pine View Wildlife Rehab Center",
    role: "Wildlife Rehabilitation Intern",
    location: "Wisconsin", // best guess — confirm exact city
    blurb:
      "Animal care and treatment for native and exotic species, including endangered animals.",
    icon: "assets/icons/timeline/pineview-hawk.png",
  },
  {
    dates: "Apr – May 2021",
    org: "WI National Primate Research Center",
    role: "Animal Care Technician",
    location: "Madison, WI",
    blurb: "Daily care for 50+ primate enclosures and enrichment builds.",
    icon: "assets/icons/timeline/primate-monkey.png",
  },
];

/* ---------- TIMELINE: VOLUNTEERING ---------- */
const VOLUNTEER = [
  {
    dates: "2026 – Present",
    org: "Kitsap Audubon Society",
    role: "Volunteer — Technology Committee & Next Gen Birders Founder",
    location: "Kitsap County, WA",
    blurb:
      "Built the interactive birding site map, founded the Next Gen Birders chapter, and leads community bird walks.",
    icon: "assets/icons/timeline/audubon-binoculars.png",
  },
  {
    dates: "2026 – Present",
    org: "Kitsap Youth Rugby",
    role: "Assistant Coach",
    location: "Kitsap County, WA",
    blurb: "Coaching the next generation of local ruggers.",
    icon: "assets/icons/timeline/rugby-ball.png",
  },
  {
    dates: "Summer 2023",
    org: "Fripp Island Turtle Team",
    role: "Volunteer",
    location: "Fripp Island, SC",
    blurb: "Sea turtle nest monitoring alongside the Fripp Island naturalist internship.",
    icon: "assets/icons/timeline/turtle.png",
  },
  {
    dates: "2021 – 2026",
    org: "Lumberjacks RFC",
    role: "Club Secretary",
    location: "Wisconsin", // best guess — confirm exact city
    blurb: "Five years with the club, helping secure its nonprofit status.",
    icon: "assets/icons/timeline/rugby-ball.png",
  },
  {
    dates: "2020 – 2024",
    org: "UW–Madison Rugby",
    role: "Player & Exec Board (Events, Merch, Fundraising)",
    location: "Madison, WI",
    blurb:
      "Four years on the team, three on the executive board — helped establish a team endowment.",
    icon: "assets/icons/timeline/rugby-ball.png",
  },
];

/* ---------- JOURNAL ----------
   - img: the photo (use a real, reasonably large JPG/PNG — a few MB is fine)
   - caption: shown under the photo and in the lightbox
   The tape + slight rotation are applied automatically and vary per photo —
   you never have to draw or position tape yourself. Just add a block. */
const JOURNAL = [
  { img: "assets/journal/beach.jpg", caption: "Olympic Coast with Friends" },
  { img: "assets/journal/rainier.jpg", caption: "Clear day views of Mt. Rainier from Gobbler's Knob" },
  { img: "assets/journal/lake.jpg", caption: "Doubtful Lake at North Cascades National Park" },
  { img: "assets/journal/ridge.jpg", caption: "Maple Pass with the Boys" },
  { img: "assets/journal/sunset.jpg", caption: "Sunrise from Sahale Glacier" },
];

/* ---------- ABOUT ---------- */
const ABOUT = {
  heading: "A Little About Me",
  photo: "assets/photos/headshot.jpg",
  photoFrameShape: "hex",
  bio:
    "I'm a cartographer and conservationist based in the Pacific Northwest. I hold a B.S. in Wildlife Ecology and an M.S. in Cartography &amp; GIS, both from UW&ndash;Madison, and I spend my time somewhere between fieldwork and the map table &mdash; stewarding land, building GIS tools, and turning data into maps people actually want to look at. Outside of work: birding, hiking, rugby, and travel.",
  contactNote:
    "Got a map project in mind, a question, or just want to say hi? I'd love to hear from you &mdash; reach out through any of the links below.",
  // Add, remove, or reorder links freely. `icon` can point to any square icon.
  links: [
    { label: "Email", icon: "assets/icons/email.png", href: "mailto:willman.joey@gmail.com" },
    { label: "Instagram", icon: "assets/icons/instagram.png", href: "#" },
    { label: "LinkedIn", icon: "assets/icons/linkedin.png", href: "#" },
  ],
  // Small decorative doodles scattered beside the bio on wide screens (hidden on mobile).
  doodles: [
    "assets/icons/compass.png",
    "assets/icons/timeline/turtle.png",
    "assets/icons/map.png",
    "assets/icons/timeline/orrock-deer.png",
    "assets/icons/camera.png",
    "assets/icons/timeline/gpc-orca.png",
    "assets/icons/timeline/audubon-binoculars.png",
    "assets/icons/timeline/fripp-gator.png",
  ],
};
