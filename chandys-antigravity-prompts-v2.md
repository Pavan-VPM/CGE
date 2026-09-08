# Chandy's Global Exports: Antigravity Prompt Pack v2

Rebuilt after reading cargokite.com and cargokite.com/tech. Every prompt below names the CargoKite mechanic it borrows, so you can see the lineage and argue with it.

---

## Part 1: What CargoKite actually does

These are the moves worth stealing. I've listed them so you can tell me which ones you want and which to drop.

| # | Mechanic | Where it appears | Verdict for your site |
|---|---|---|---|
| 1 | **Percentage preloader.** Logo icon plus a counter ticking 00 to 100% before the page reveals | Every page | Take it. Cheap, sets a premium tone instantly |
| 2 | **Video hero with a product cutout layered over it.** An ocean video loop, a still fallback image, and a separate PNG of the ship composited on top so the ship reads sharp against moving water | Home hero | Take it, adapted. Your video is a workshop, your cutout is an instrument |
| 3 | **Investor logo strip immediately under the headline.** Social proof before the value proposition | Home hero | Adapt. You have no investors, but you have buyers, ports and certifications |
| 4 | **"Scroll down to discover how it works" as a looping marquee.** The text repeats and slides horizontally, with a bullet separator | Both heroes | Take it |
| 5 | **Single-word section eyebrows.** Company, Problem, Solution, Technology, Why us, FAQ. Sentence case, not tracked-out caps | Throughout | Take it. This is the disciplined version of an eyebrow label |
| 6 | **Nav labels with a trailing period.** "Home." "About us." "Technology." | Header and footer | Take it. Costs nothing, reads as designed |
| 7 | **The ellipsis copy device.** Section headline ends "…the cheapest way to transport goods, but" and then every item below opens with "…not reliable", "…not sustainable", "…slow". The headline runs through all five items | Problem section | Take it. This is the single best idea on the site and almost nobody copies it |
| 8 | **Two-part benefit headings.** "Decentralized trade", "Individualized service", "Direct transport", where the two halves are typographically distinct | Solution section | Take it |
| 9 | **The multiplication visual.** One big freight-ship silhouette, then three small ships, then eight. Scroll-driven, argues the whole thesis without a word | Paradigm shift block | Take it and make it yours. One log becomes many finished goods |
| 10 | **Stat headings, not stat cards.** "Up to 70% fuel savings", "320 containers capacity" set as headings in flowing layout rather than boxed tiles | Technology teaser | Take it |
| 11 | **Annotated product hotspots.** Six ship components, each with a Read more / Hide toggle revealing two paragraphs in place, plus a duplicate accordion version for mobile | /tech | Take it. This is your exploded guitar, and it validates the approach |
| 12 | **Small video expanding to full bleed.** A thumbnail loop and a main loop as separate files, the small one growing into the large one on scroll | /tech | Take it if you can shoot decent workshop footage |
| 13 | **Dashboard assembly.** Three UI board images plus a full composite, with separate mobile crops, assembling as you scroll | /tech digital twin | Adapt into a spec sheet that assembles |
| 14 | **The interactive tool.** Two port inputs with autocomplete, a "See the route" action, an honest "No port found" empty state, a "Kite usage over time" chart, and a technical specification download | /tech route planner | Take it. This is your lane and lead-time estimator, and it is the highest-intent thing on the page |
| 15 | **Partner logo marquee.** The logo list is duplicated in the markup, which is how you build a seamless infinite scroll | Home | Take it if you have real marks to show |
| 16 | **Modal lead capture, two flavours.** A soft "Get in touch" and a hard "Get your custom study today", the second offering a non-binding customized study | Both pages | Take it. Your version is a non-binding sample and quotation |
| 17 | **Sticky bottom CTA ribbon.** "Are you interested? Let's discuss today!" repeated as a marquee, pinned across the viewport bottom | Every page | Take it |
| 18 | **FAQ that answers the awkward questions honestly.** "What if there is no wind?", "Are your ships already in operation?" answered with a flat "No, we are still in development" | Home | Take it. Your equivalents are the questions buyers actually hesitate on |

**What they did that you should not copy:** stock team and problem photography, a preloader on every route rather than first load only, and the heavy use of adjectives like groundbreaking and game-changer. Their engineering claims justify the register; a timber exporter is more credible plain.

**Where your site should beat theirs:** they are pre-revenue selling a vision, so their site is persuasion. You have real material, real tolerances and real containers going out. Your site should be *specification as seduction*. Every interactive moment should end in a number a buyer can act on.

---

## Part 2: Design direction

**The idea, unchanged:** grain becomes sound. Timber and music are the same material at two stages of its life, and you are the only exporter shipping both out of a hill district.

**Palette**

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A2450` | Type, dark fields, the navy from your logo |
| `--signal` | `#1B6EF3` | Actions, active states, lane lines |
| `--blueprint` | `#E8F0FB` | Technical washes, tinted panels |
| `--mill` | `#F2F4F7` | Page base. Cool paper, not warm cream |
| `--rosewood` | `#6B3A2A` | The material itself. Anchors, hovers |
| `--brass` | `#C9A227` | Hardware. Under 3% of pixels |

**Type:** Archivo variable for display, width axis 110 to 125, weight 700 to 800. Newsreader for body at 18px, measure capped 68ch. IBM Plex Mono in one place only, the numeric spec tables, because that content is tabular data.

**Bans:** no tracked-out caps eyebrows, no identical rounded cards with matching grey shadows, no fade-up on every section, no hover-lift on every tile, no warm cream plus serif plus terracotta, no arrow glyph on button labels, no stock handshake or generic container imagery.

**Facts to confirm before you build.** The site must not invent claims. Fill these into the content file or the agent leaves visible gaps:
- Domain mismatch on your card: `chandysglobalexports@gmail.com` versus `chandyglobalexports.com` without the "s". Pick one.
- Real certifications: ISPM-15, ISO, FSC or equivalent, IEC, GST, EPCH or APEDA membership.
- Real capacity: monthly volume, MOQ per line, lead time in days.
- Real species: rosewood, teak, jackwood, silver oak, mango, gurjan face veneer.
- Real ports shipped from and countries shipped to.
- Photos: 6 to 12 product shots, the Kodagu unit, Sisson Chandy, and 20 to 40 seconds of workshop footage.

---

## Part 3: The prompts

Run in order, one per agent turn. After each, ask for screenshots at 1440, 768 and 390 and a self-critique against the bans list.

---

### Prompt 0: Setup and design system

```
Set up a production marketing site for a real business: Chandy's Global Exports, a
proprietorship in Kodagu, Karnataka, India, manufacturing and exporting guitar parts,
hardwood furniture, plywood and veneers. Proprietor: Sisson Chandy.

Stack: Next.js 15 App Router, TypeScript strict, Tailwind with a custom token layer and
Tailwind's default palette made unreachable, GSAP with ScrollTrigger for scroll
choreography, Framer Motion for component state, Lenis for smooth scroll disabled under
prefers-reduced-motion, react-three-fiber only where a prompt explicitly calls for it,
next/font for Archivo variable and Newsreader with an IBM Plex Mono tabular subset.

Build only the shell this turn:

1. Tokens as CSS custom properties, mapped into tailwind.config:
   --ink #0A2450, --signal #1B6EF3, --blueprint #E8F0FB, --mill #F2F4F7,
   --rosewood #6B3A2A, --brass #C9A227.
2. Type scale on a 1.25 ratio from 16px. Display classes use Archivo's width axis at 115.
   Classes: .display-1 to .display-4, .lede, .body, .spec (mono, tabular-nums).
3. 8px spacing rhythm, 12-column grid, 1440px max content width, a full-bleed escape utility.
4. /content/site.ts as the single source of truth: business name, proprietor, phone
   +91 9353927123, email, address "Hi Tech Wood Industries, Kodagu, Karnataka 571218",
   the three taglines, and typed but EMPTY arrays for products, species, certifications,
   ports and faqs. Every section reads from this file. Zero hardcoded copy in components.
5. Motion primitives: useReducedMotion, a Reveal component, and a ScrollTrigger provider
   that kills all triggers and snaps every animation to its end state when reduced motion
   is on. No element may be left invisible in that mode.
6. Quality floor: skip link, semantic landmarks, 2px --signal focus rings at 2px offset
   never removed, AA contrast on every text pair.

Output your token rationale in one paragraph first, specifically why these choices belong
to a timber-and-instruments exporter and not to any other B2B site. Then build.
No page sections yet.
```

---

### Prompt 1: Preloader and header

*Borrows CargoKite mechanics 1, 6 and 17.*

```
Build three chrome elements.

PRELOADER. First visit only, gated behind sessionStorage so route changes never replay it.
Full-viewport --ink. Centred: the logo's globe mark drawn as SVG, its orbit arcs stroking
on over 700ms, with a counter beneath ticking 00 to 100 in Archivo at display-2, mono
tabular-nums for the digits so they do not jitter. The percentage tracks real asset
progress, not a fake timer, using a preload promise over the hero video and fonts. At 100
the panel splits horizontally and clears in 500ms, revealing the hero mid-animation rather
than waiting for it. Hard ceiling of 2.5 seconds, then it clears regardless. Skipped
entirely under reduced motion.

HEADER. Transparent over the hero, condensing on scroll past it to a 56px --ink bar with
backdrop blur, one height-and-background tween at 240ms. Nav labels carry a trailing
period: "Home." "What we ship." "Materials." "Process." "Reach." The wordmark is set in
Archivo. One filled button, "Request a quote", which opens the Prompt 11 modal. Never
hide the header on scroll-down; buyers hate hunting for the nav.

Mobile menu: full-screen --ink overlay, links at display-3 scale, left aligned, full-width
tap targets, opening with a clip-path wipe from the top right at 320ms. Focus trapped,
Escape closes, focus returns to the trigger.

STICKY CTA RIBBON. Pinned to the viewport bottom from the second section onward, a
28px-high --brass strip with a horizontally marqueeing line in --ink:
"Sampling a new supplier? Ask for a sample crate." repeated with a bullet separator.
Duplicate the text node in the DOM so the loop is seamless. Clicking anywhere on the
ribbon opens the quote modal. Dismissible, with the dismissal remembered in sessionStorage.
Under reduced motion the text sits static, centred, not scrolling.
```

---

### Prompt 2: Hero

*Borrows mechanics 2, 3 and 4, replacing the ocean video with your workshop and the ship cutout with an instrument.*

```
Build the hero. Full viewport, background --ink.

LAYERS, back to front:
1. A muted looping video of the Kodagu workshop, saw or sander in motion, colour-graded
   cool toward --ink so it never fights the type. poster image required, autoplay muted
   loop playsInline, and it does not download on mobile or under reduced motion, where the
   poster still is used instead.
2. A dark gradient scrim so all type clears AA contrast.
3. A cutout PNG of a finished fretboard or guitar neck, sharp-edged, no drop shadow,
   composited over the moving footage at the right of the frame. The stillness of the
   object against the moving mill is the whole shot. Same trick CargoKite uses with its
   ship over the ocean.

TYPE, left-aligned in columns 1 to 6:
- Display headline, maximum two lines: "Grain that carries a note across nine time zones."
  Masks up per line as the preloader clears.
- One-sentence lede naming the three real trades and the origin.
- Two actions: "Request a quote" filled, "See what we ship" quiet.

PROOF STRIP, directly under the type, borrowing CargoKite's investor row but honest:
a small label reading "Shipping from Kodagu to" followed by the destination ports from
content, set as plain text with bullet separators. If the ports array is empty, the strip
renders nothing at all rather than a placeholder.

SCROLL CUE at the bottom edge: "Scroll to see how a log becomes an instrument" repeating
as a horizontal marquee with a bullet separator, in --blueprint at 13px, duplicated node
for a seamless loop, static under reduced motion.

One orchestrated load sequence only: scrim fades, headline masks up per line at 60ms
stagger, cutout slides 24px into place, marquee starts. Nothing else on the page animates
on load.
```

---

### Prompt 3: The buyer's problem

*Borrows mechanic 7, the ellipsis device. This is the section that will make the site feel written rather than generated.*

```
Build the problem section using a continuing-sentence structure. The section headline is
incomplete and every item finishes it.

Eyebrow, one word, sentence case, no letter-spacing: "Sourcing"

Headline: "Buying wood products from overseas is cheap, until it isn't"

Five items, each opening with an ellipsis so the headline runs through them. Write them
about the real anxieties of a furniture or instrument buyer importing from India:

…the moisture content arrives wrong and the panel cups in a dry showroom
…the grade in the photo is not the grade in the container
…the crate fails phytosanitary inspection at the destination port
…nobody answers after the deposit clears
…the MOQ assumes you are a factory, not a workshop

Each item gets the ellipsis heading, two sentences of plain copy, and no image unless real
photography exists in content. Do not use stock imagery here. Do not name competitors.
Do not describe these as "pain points".

Layout: a pinned vertical stack where items overlay as you scroll, each one sliding up
over the last with the previous dimming to 30%, so the list reads as an accumulating
worry. One ScrollTrigger for the whole stack, pin duration equal to five viewport heights,
scrub true.

Under reduced motion and on mobile: no pin, a plain vertical list, hairline --blueprint
rules between items, nothing animates.

Immediately after the fifth item, one line of --mill on --ink in Archivo display-3:
"Every one of those is a specification problem. So we ship specifications." That line is
the hinge into the next section.
```

---

### Prompt 4: What we ship

*Borrows mechanic 8, two-part headings, plus mechanic 10, stat headings not stat cards.*

```
Build the three-trades section. No cards, no grid, no icons.

Eyebrow: "Trades". Headline: "Three products out of one forest"

One continuous SVG seam runs across the viewport like a sawn edge in --rosewood at 1px,
with three 8px --brass square nodes on it. The three trades alternate above and below the
seam so the section reads as one object cut into three:

  Guitar components  above left
  ---o---------o---------o---
       Hardwood furniture  below centre    Plywood and veneer  above right

Each trade carries a two-part heading where the halves are typographically distinct, the
first word in --rosewood and the qualifier in --ink, following the CargoKite pattern:
"Fretboard blanks", "Carcass hardwood", "Gurjan-faced ply". Then two sentences naming
actual items. Then one real specification in .spec mono, read from content, rendered as a
heading rather than boxed in a tile: thickness range in mm, or MOQ, or moisture target.

Scroll: the seam draws left to right across the section's own length using one
ScrollTrigger, and each trade reaches full opacity as its node is passed. Nothing fades up.

Hover: the seam thickens between that trade's neighbouring nodes and the heading shifts
fully to --rosewood. That is the entire hover treatment on this site.

Mobile: seam becomes vertical against the left edge, trades stack against it.
```

---

### Prompt 5: One log, many goods

*Borrows mechanic 9, the multiplication visual, which is the strongest single idea on their site.*

```
Build the yield section. This argues your whole thesis with almost no words, exactly as
CargoKite's one-big-ship-to-eight-small-ships block does.

Three scroll states in a pinned viewport, --mill background:

State 1: a single large log silhouette in --rosewood, centred, filling most of the frame,
captioned "One log."

State 2: the log divides along its length into four squared billets that separate with a
slight rotation, captioned "Quartersawn four ways."

State 3: the billets multiply and resolve into a scatter of finished goods drawn as
outlined SVG silhouettes: fretboard blanks, a bridge, a neck, a table top, a chair
frame, ply sheets, veneer leaves. Roughly 20 objects, arranged in a loose grid, each in
--ink outline with a few filled --rosewood. Captioned "Nothing left over."

Implementation: one pinned ScrollTrigger, scrub true, with SVG path morphing between
states 1 and 2 and a staggered scale-and-fade-in for the objects in state 3 at 25ms
intervals. Keep the whole illustration as one inline SVG so it stays crisp and under 40KB.

Below the pinned block, once released, a single sentence at 60ch: name the real yield
practice, that offcuts from furniture stock become instrument parts and that this is why
your MOQ can be low on small components. Only write this if it is true. If it is not,
tell me and I will rewrite the section.

Reduced motion and mobile: the three states become three stacked static illustrations
with their captions.
```

---

### Prompt 6: The parts viewer

*Borrows mechanic 11, their annotated ship, including the detail that they ship a separate accordion for mobile.*

```
Build the interactive guitar-components viewer, the site's second set piece.

A single acoustic guitar in react-three-fiber, low-poly and stylised in --ink and
--rosewood with --brass hardware. Not photorealistic. On scroll into view it explodes
gently along its long axis into labelled components: headstock, tuning machines, nut,
neck blank, fretboard, frets, bridge, saddle, bracing, back and sides, binding, rosette.

Hotspot behaviour, following CargoKite's Read more / Hide pattern rather than a modal:
each part carries a small --brass marker. Activating it expands two paragraphs in place
beside the instrument and the marker's label flips to "Hide". Only one part is open at a
time. The rest of the instrument dims to 15%.

The expanded panel carries, from content: part name, species options, dimensional
tolerance in mm, finish state as supplied, and MOQ. Any missing field renders a
"spec pending" chip. Never fabricate a tolerance.

The panel is the only place IBM Plex Mono appears, with tabular-nums, because it is
numeric data in a table.

Each part has an "Add to quote" control that pushes the part name into a quote basket in
React state, surfaced later in the Prompt 11 modal. No cart, no pricing, no checkout.

Keyboard: parts focusable in anatomical order, Enter expands, Escape collapses, selection
announced via aria-live. Orbit clamped to 30 degrees per axis.

Mobile and reduced motion: ship a separate pre-rendered exploded SVG diagram with the same
hotspots, plus a plain accordion of the twelve parts underneath it. Full functionality,
zero 3D. Dynamic-import the three.js bundle gated on desktop pointer type so mobile never
downloads it.

Budget: hero plus this section under 400KB JS gzipped.
```

---

### Prompt 7: Materials sample book

*No CargoKite equivalent. This one is yours, because they sell one product and you sell material variety.*

```
Build the veneer and plywood section as a physical sample book, not a gallery.

Swatches fan from the left edge like a fan deck, each a tall sliver showing real grain
photography, overlapping its neighbour by 70%.

Hover fans a swatch out of the stack and displaces its neighbours, Framer Motion layout
animation, spring stiffness 180 damping 22, so the movement feels like card stock rather
than CSS.

Click pulls it fully out into a detail view filling the right two-thirds: large grain
image, species common and botanical name, origin, thickness range in mm, sheet sizes,
core type for ply, and one plain line on what it is used for. Click again or Escape
returns it.

A thickness slider from 0.5mm veneer to 25mm ply live-redraws a small edge-on
cross-section diagram to scale, showing individual plies. Continuous, not stepped.

Copy rule: describe material honestly. No premium, exquisite, world-class or finest. Say
what it is, what size it comes in, what it is for.

Empty state, written as an invitation not an apology: if the species array is empty,
render one swatch reading "Sample book in preparation" linking to the quote modal.

Mobile: horizontal snap-scroll strip, tap opens a bottom sheet.
```

---

### Prompt 8: Timber to tone

*Borrows mechanic 12, the small video expanding to full bleed, wrapped around the process sequence. Numbers are allowed here because this is a genuine sequence.*

```
Build the process section, seven numbered stages, as a pinned horizontal scroll:

1 Selection, standing timber graded in Kodagu
2 Sawmilling, quartersawn for stability
3 Seasoning, kiln to a target moisture content in percent
4 Machining, blanks to instrument and furniture tolerances in mm
5 Finishing, sanding and surface prep
6 Grading and QC, moisture re-check and defect rejection
7 Packing, ISPM-15 treated crates to port

Open the section with CargoKite's video move: a small workshop video loop sitting inline
at about 320px wide, which scales to full bleed as it is scrolled into the centre of the
viewport, then holds while the horizontal track begins. Two source files, a light
thumbnail loop and the main loop, so the small state does not carry the full bitrate.
Poster fallback, muted, playsInline, and no video at all under reduced motion or on
mobile data-saver.

The track: vertical wheel input translates horizontally, about three viewport widths of
travel. Each stage is a tall panel on --mill, with its number set large in Archivo at
width 125 in --blueprint, sitting behind the copy as structure rather than as a badge.

Along the track's lower edge, one continuous SVG cross-section morphs as you scroll: a
rough log at stage 1, squared, sliced, and a finished fretboard blank at stage 7. Path
interpolation tied to scroll progress. This is the section's one indulgence.

A progress rail at the top shows position, with the seven stage names as click targets
that tween to that stage.

No card borders, no shadows, no per-panel entrances. The horizontal travel is the animation.

Reduced motion and mobile: no pin, no horizontal scroll, a vertical sequence with the
cross-section stepping through seven static states.
```

---

### Prompt 9: The lane estimator

*Borrows mechanic 14, their route planner, which is the highest-intent element on their site. This is the most commercially valuable thing you can build.*

```
Build an interactive lane estimator, modelled on CargoKite's route planner including its
autocomplete inputs, its "See the route" action, its honest "No port found" empty state
and its specification download.

Eyebrow: "Reach". Headline: "Tell it where you are and what you need"

Three inputs in a single row on desktop, stacked on mobile:
- Product: select across the three trades, then the specific item. Pre-filled from the
  Prompt 6 quote basket, shown as removable chips so the buyer sees the site remembered
  correctly.
- Destination port: text input with autocomplete over the ports in content, accepting free
  text for anything unlisted. Empty state reads "Port not in our lane list yet, we will
  quote it" and keeps the value.
- Quantity with unit.

Action button: "See the route". On activation:
- A dot-matrix world map in --blueprint on --mill, no borders and no political labels,
  draws a --signal bezier arc from a --brass Kodagu origin node to the destination.
- A results strip appears in .spec mono: origin port, transit time in days, container fit
  for that quantity in TEU, indicative lead time from confirmed order, and the Incoterms
  offered.
- Every number is read from content and labelled "indicative". Any value absent from
  content renders "Confirm with us" as a link into the quote modal. Never compute a
  transit time from a formula you invented, and never fabricate a port pairing.
- A "Download specification sheet" secondary action generates a PDF of the selected
  product's specs, or is hidden entirely if the specs are incomplete.
- A "Continue to quote" primary action carries all three input values into the Prompt 11
  modal, pre-filled.

Filter state and destination reflect in the URL query so a lane view is shareable.

Motion: the arc draws once per query at 600ms. No looping pulses, no travelling dots, no
radar rings.
```

---

### Prompt 10: Compliance sheet

*Borrows mechanic 13, their scroll-assembled dashboard, applied to a document instead of a UI.*

```
Build the compliance section as a specification sheet that assembles itself as you scroll,
the way CargoKite assembles its digital-twin dashboard from separate boards.

Full bleed on --mill. Three panels slide into register to form one continuous document,
each locking into place with a 200ms settle: the parameters column, the values column,
the documentation column. Once assembled it is a single quiet table and stays still.

Two-column technical layout, hairline --blueprint rules only, no block border, no cards,
no shadows. Parameter left, value right in mono with tabular-nums.

Rows, every value from content:
- Moisture content at dispatch, percent, with tolerance
- Grading standard applied
- Phytosanitary treatment, ISPM-15 heat treatment or fumigation, with the mark
- Packing specification, crate type and container loading
- Documents issued: invoice, packing list, certificate of origin, phytosanitary
  certificate, bill of lading
- Incoterms offered
- Lead time from confirmed order, in days
- Registration numbers, IEC and GST

Any absent value renders "Confirm with us" linked to the quote modal. Never fabricate a
certification, a standard number or a registration number. If the certifications array is
empty, the section reads "Certification details on request" and shows no logos.

Nothing else in this section animates. It earns trust by being still.

Then, directly below, an FAQ accordion answering the questions buyers actually hesitate
on, in CargoKite's flatly honest register. Their site answers "Are your ships already in
operation?" with a plain "No, we are still in development." Match that tone:
- Can I get a sample before ordering a container?
- What is your minimum order for guitar parts specifically?
- What happens if the moisture content is out of spec on arrival?
- Do you export the species I need, and is it CITES-restricted?
- Who handles customs at my end?
- How do I pay, and what are your terms?

Draft honest answers from content and flag every one you had to guess at, so I can correct
them before launch.
```

---

### Prompt 11: Quote modal and the proprietor

*Borrows mechanic 16, their two-flavour modal, including the softer "just wanna say hi" alternative.*

```
Build two modals and one section.

MODAL A, "Request a quote". Three steps on one screen, progress as a thin --signal rail,
not numbered dots.
Step 1, what: trades and items, pre-filled from the quote basket and the lane estimator,
shown as removable chips.
Step 2, how much and where: quantity with unit, destination port, target month, Incoterm.
Step 3, who: name, company, country, email, phone, optional message.

MODAL B, "Ask for a sample crate", their harder-CTA equivalent: a shorter form pitching a
non-binding sample shipment against the buyer's own specification. Same three-step chrome,
fewer fields.

Both modals carry CargoKite's softer escape hatch below the form: "Or just want to say
hello?" followed by the real email as a mailto. Some buyers will never fill a form.

Rules:
- No HTML form element. Wire buttons with onClick.
- Validate on blur, never on keystroke. Errors sit under the field and say what to do:
  "Add a quantity so we can price it", not "Invalid input". Errors do not apologise.
- Submit reads "Send request". Success reads "Request sent", states what happens next with
  a realistic response window, and shows the direct phone number for anyone unwilling to
  wait.
- Failure explains what failed and offers a mailto fallback with the entire request
  pre-filled in the body.
- Keyboard-completable, focus moves to each step's first field, step changes announced via
  aria-live, focus trapped, Escape closes with a confirm if fields are dirty.
- In-progress input persisted to sessionStorage.

PROPRIETOR SECTION. One person, one column, no team grid of one. Left: a single portrait
duotoned into --ink and --blueprint via blend modes. If no image exists, set his initials
in Archivo at display scale in --blueprint and nothing else. No silhouette icon. Right:
name, the word Proprietor as plain sentence-case body text not a caps label, three or four
sentences in his own voice, then his phone and email as real tel and mailto links, because
on a proprietorship site the buyer wants the person.

Below, one line in Archivo display-3: "People, products, partnerships, worldwide." The
only place a tagline is used as a display element. The other two live in the footer.
```

---

### Prompt 12: Footer and hardening

```
FOOTER on --ink. Nav labels with trailing periods, matching the header. The two remaining
taglines, "Connecting markets, delivering value" and "Global reach, stronger tomorrow",
set as body text on separate lines, not joined with middle dots. Full contact block: the
address linking to a map, phone as tel, email as mailto. Trade links and the compliance
link. A line noting the proprietorship and its registration numbers if they exist in
content. Copyright with the year computed at build time. Nothing animates.

Then a full hardening pass. Report as a checklist with fixes applied.

Performance:
- Lighthouse mobile: 90+ performance, 100 accessibility.
- Under 400KB JS gzipped on first load. three.js behind a dynamic import resolving only on
  desktop pointer devices.
- All video: poster required, preload metadata only, no autoplay on mobile data-saver,
  H.264 plus a WebM source, under 3MB each.
- All images via next/image, AVIF with WebP fallback, explicit dimensions, blur
  placeholders, CLS under 0.05.
- Self-hosted fonts, Latin subset, only above-fold families preloaded, font-display swap.
- Kill every ScrollTrigger on unmount and route change. Verify no leaked RAF loops with a
  60-second idle profile.

Accessibility:
- Keyboard-complete: hero, parts viewer, swatch stack, lane estimator, modals, accordion.
  Nothing mouse-only.
- Visible focus everywhere, 2px --signal at 2px offset, never removed.
- AA contrast verified on every pair including --signal on --mill and --brass on --ink.
  Fix the usage, not the token.
- prefers-reduced-motion honoured section by section, every animated element landing in
  its final state, nothing left invisible.
- Preloader skipped under reduced motion and after first visit.

SEO:
- One h1 per page, semantic heading order.
- LocalBusiness and Organization JSON-LD with the real address, geo and phone. Product
  schema per trade. FAQPage schema on the accordion.
- Open Graph and Twitter cards, OG image composited from the hero.
- sitemap.xml, robots.txt, canonicals.

Content integrity check, run last and report plainly: list every string rendered anywhere
that is not sourced from /content/site.ts. Every invented number, certification, client
name, testimonial or capacity claim is removed and replaced with a link to the quote modal.
I would rather ship a visible gap than a false claim.
```

---

## Working notes

- **Prompt 3 is the sleeper.** The ellipsis device is the cheapest way to make the site feel written by a person. If you only take one thing from CargoKite, take that.
- **Prompt 9 is the money.** Their route planner exists to convert. Yours should too, and it needs real port and lead-time data to work. Get that first.
- **Four set pieces is one too many.** You have the hero, the yield multiplication, the parts viewer, the swatch stack and the horizontal process. Build them all, then look at the whole thing and cut the weakest. Chanel's rule: remove one accessory before leaving the house.
- **Their register does not transfer.** CargoKite is pre-revenue selling a future, so groundbreaking and game-changer are load-bearing for them. You have containers going out. Plain and specific beats visionary in your market.
