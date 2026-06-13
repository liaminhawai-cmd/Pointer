# Build Spec: "Pointers" — an anthology of nonduality contemplation tools

This document is a brief for Claude Code. It describes a website that hosts a growing
collection of short contemplative "pointers" — text pieces, image series, and small
interactive instruments — each designed to trigger a particular non-dual recognition.

The single most important architectural requirement: **the site must be modular so new
pointers can be added one at a time without touching anything else.** The owner will keep
adding pieces over months. Adding a pointer should mean dropping in one new module and one
manifest entry — nothing more.

---

## 1. Design philosophy (read this before making any visual choices)

These pointers work *because they are stark*. They are instruments, not content. A pointer
fails the moment it feels like a polished "experience" to be consumed, because the whole
mechanism depends on the reader/viewer doing the work themselves and hitting a wall.

Therefore the overriding aesthetic brief is **restraint**:

- One pointer per page. No grids of cards competing for attention on the pointer pages themselves.
- Enormous white (or near-black) space. The content should feel like it's floating alone.
- No engagement furniture: no "related pointers," no share buttons cluttering the piece,
  no comment sections, no newsletter popups, no analytics nag.
- No progress indicators, no gamification, no scores anywhere — this matters especially for
  the interactive pieces (see the sync game).
- Typography-led. A single excellent serif for the prose pointers (the text *is* the art).
  Suggested: a humanist serif like Source Serif, Spectral, or Newsreader. One typeface,
  a couple of weights. Generous line height (~1.7), measure capped around 60–68 characters.
- A calm, near-monochrome palette. Off-white/ink, or a dark mode that's genuinely dark
  (near-black, not grey). Let individual interactive pieces introduce their own colour.
- Motion only where a pointer requires it. The site chrome itself does not animate.

The home/index page is the one place a little curation is allowed — it lists the pointers.
Keep even that quiet: a plain list of titles, maybe a one-line description on hover, no
thumbnails-as-advertising.

**Tone test for any UI decision:** would this make the piece feel more like a museum
placard or more like a billboard? Choose placard every time.

---

## 2. Tech stack & hosting

- **Pure static site. No backend, no database, no server-side rendering.** Everything is
  HTML/CSS/JS served as static files. This keeps hosting free and bulletproof under traffic
  spikes (a pointer may get posted to Reddit and spike unpredictably).
- **Vanilla where possible.** Plain HTML/CSS/JS, or a very light static-site generator
  (Astro is a good fit if you want one, but do not pull in a heavy framework). The
  interactive pieces are self-contained vanilla-JS canvas apps — no React needed for them.
- **No browser storage APIs unless genuinely needed.** If a piece needs to remember state
  within a session, use in-memory JS only. Do not add localStorage/cookies; nothing here
  needs persistence and it keeps the privacy story clean (no banners).
- **Target host: Cloudflare Pages** (unlimited bandwidth on the free tier, no surprise bills
  on a traffic spike). Set up the build/deploy config for Cloudflare Pages. GitHub Pages or
  Netlify are acceptable fallbacks. Custom domain optional (~$10–15/yr); works fine on the
  free `*.pages.dev` subdomain to start.
- Mobile-first and fully responsive. Many readers arrive from a phone. The interactive
  pieces must work with touch as well as mouse.
- Accessibility basics: semantic HTML, alt text on the image-series pieces, respects
  `prefers-reduced-motion` (offer a static fallback for animated pieces).

---

## 3. Architecture for "add as I go"

Use a **manifest-driven** structure. There is one registry file that lists every pointer.
The index page renders itself from the registry. Each pointer is an independent module.

Suggested layout (adapt to chosen generator if any):

```
/
├── index.html                  # renders the pointer list from the manifest
├── pointers.json               # THE REGISTRY — single source of truth (see schema below)
├── /styles
│   └── site.css                # shared design tokens, typography, layout shell
├── /lib
│   └── shell.js                # loads manifest, builds index, common page chrome
├── /pointers
│   ├── /puppet-sheet           # one folder per pointer
│   │   ├── index.html          # the pointer page (uses the shared shell)
│   │   └── pointer.md          # (for text pointers) the prose, kept editable as plain text
│   ├── /play-doh-man
│   │   └── ...
│   ├── /movie-projector        # interactive
│   │   ├── index.html
│   │   └── movie.js
│   ├── /rope-climber           # image series
│   │   ├── index.html
│   │   └── /images
│   └── /sync                   # the sync game (the centrepiece)
│       ├── index.html
│       └── sync.js
└── /assets
    └── shared images, favicon, etc.
```

### Manifest schema (`pointers.json`)

```json
{
  "pointers": [
    {
      "id": "puppet-sheet",
      "title": "The Puppet and the Sheet",
      "type": "text",                  // "text" | "image-series" | "interactive"
      "blurb": "The first one. An observer dissolving into its own background.",
      "path": "/pointers/puppet-sheet/",
      "order": 10,                     // controls index ordering; leave gaps (10,20,30)
      "published": true,               // false = built but hidden from index
      "theme": null                    // optional per-pointer accent, else inherit
    }
  ]
}
```

**To add a pointer later:** create its folder under `/pointers`, write its `index.html`
(text pointers just drop prose into a shared template; interactives ship their own JS), and
add one object to `pointers.json`. Nothing else changes. The `published` flag lets pieces be
committed before they're ready to appear. The `order` gaps let new pieces slot anywhere
without renumbering.

### Shared page shell

Build one shell (header with a quiet link back to the index, the content well, minimal
footer) that every pointer page uses, so a new text pointer is *just its words* and a new
interactive is *just its canvas + script*. The shell should add as little as possible around
the content.

---

## 4. The pointers — current roster

Each pointer below lists its **medium** (which determines how it's built) and its **single
job** (the one recognition it targets — do not dilute it with a second point). Several are
ready to ship as text immediately; the interactives are phased.

### 4.1 Text pointers (ship first — these are essentially done)

Build these as simple typographic pages. The prose lives in an editable `pointer.md` (or
straight in the HTML). No imagery, no interaction — the words do everything. Let each one
breathe on its own page with lots of space.

**The Puppet and the Sheet** — *job: dissolve the observer.* An observer unravelling into the
background it was watching. (Owner's origin pointer; keep it gentle — "unravels and untangles,"
never stretched or distorted.)

**The Play-Doh Man** — *job: dissolve the located/owned self.* Reader imagines chopping the
body and noticing which piece the mind labels "me." Pure procedure; must stay text so the
reader does the chopping in their own proprioception. Do NOT illustrate it.

**The Mirror Eye** — *job: dissolve the observer (perceptual).* An attempt-and-fail
contemplation: try to picture an eye seeing itself, notice the third-person-camera cheat.

**The Chair Before the Word** — *job: expose pre-verbal recognition.* Catch the gap where a
shape is known before the label "chair" lands on it.

**The Letter (free will)** — *job: dissolve the doer.* The cause-and-effect deconstruction of
choice. Ships as text now; an interactive version is specced below (4.3) as a later upgrade.

### 4.2 Image series

**The Rope Climber** — *job: dissolve the seeker / striving (the climber is made of the rope
he climbs).* A panel sequence with a **delayed reveal**: it reads as an ordinary rope-climb
until you notice the climber's body *is* knotted rope, continuous with the rope above. Final
panel makes it explicit.

Build as a clean sequential-panel viewer (vertical scroll on mobile, panel layout on desktop).
The owner has the artwork as images. Requirements:

- Preserve the reveal — do **not** lead with the final knot-man image as a thumbnail or
  hero. The first thing seen must be the ordinary climb.
- Optional later upgrade to animation; for now it's a still series.
- One restrained caption line at most, or none. Let the images carry it.

### 4.3 Interactive pointers (phased builds)

Each interactive must obey the design philosophy: the interaction *is* the demolition. If an
interaction doesn't make the recognition land harder than text would, cut it.

**The Movie Projector (frame-rate slider)** — *job: dissolve "movie"-ness / continuity
(anicca).* A canvas plays a looping animation. A control (slider, or a "slowing" that the
user drags) reduces the frame rate. As it slows, motion becomes a flipbook, then single
frames, then black gaps between frames. The piece asks, at each stage, whether it is "still a
movie." Then it turns the question on the viewer (their own continuity is also interpolation).

- Build as vanilla JS + canvas. Lightweight.
- The "movie" should be simple and abstract (a moving shape / figure), not a video file.
- The dissolution must be *felt*: at high frame-rate it's obviously a movie; at ~1–2 fps the
  label visibly fails. Let the user sit at any speed.
- End state hangs in the black gap between frames. No "you win." Maybe one quiet line.

**The Letter Trap (free-will interactive)** — *job: dissolve the doer (agency), via a sprung
trap rather than an argument.* A button: "Click when you decide to click." After the click, a
line appears: "Did you decide to decide?" Then: "And did you decide *that*?" The interaction
should make the reader hunt upstream for the chooser and fail. Do NOT animate a deterministic
domino-chain (that *asserts* the conclusion); the power is in the reader's own failed search.
Keep it almost bare — a button and a few lines that appear.

### 4.4 The Sync Field — the centrepiece (full spec in §5)

*Job: the affective fetters — craving for the refined state (rūpa/arūpa-rāga), and the
grasping reflex itself.* This is the one pointer whose entire payload lives in being *played*:
the user can understand "grasping breaks it" intellectually and still physically lunge for the
mouse and watch it shatter. No text pointer can produce that gap. Build it last and tune it
most. Detailed spec below.

---

## 5. The Sync Field — detailed build spec

### 5.1 What it is

A field of **coupled phase-oscillators** rendered on a canvas. Each oscillator has a phase
(a point on a cycle) and a natural frequency. Oscillators influence each other toward
alignment. Left alone with the right coupling, the field **spontaneously synchronises** —
incoherent visual noise resolves into a single coherent, breathing pulse — with no central
controller. This is the Kuramoto family of models (fireflies flashing in unison, metronomes
on a shared table pulling into lockstep).

The oscillators are positioned to form a **human silhouette in a seated/lotus posture**. When
incoherent, the field looks like static noise. When coherent, the figure *resolves out of the
noise* and pulses as one. **The figure is not drawn — it emerges from coherence.**

This is NOT Conway's Game of Life. It is a continuous wave/oscillator field. Earlier notes
referenced Conway; ignore that — use coupled oscillators.

### 5.2 The teaching the mechanics must produce (do not script these; they must emerge)

1. **Effort injects chaos.** The more the user clicks, the more turbulence they add. Working
   hard makes it worse — not as a punishment, but because driving an oscillator field
   perturbs it faster than it settles.
2. **Do-nothing self-syncs.** Left completely alone, the field drifts to coherence on its own.
   This is the model's natural attractor — it should NOT be presented or discoverable as "the
   solution." (See 5.6 — the no-UI constraint is critical here.)
3. **The grasp breaks it.** When the field is near full coherence and the user clicks to
   *hold/maintain* it, that click shatters it — precisely because the synced state is
   delicately balanced and a perturbation at that moment is maximally destructive. The lunge
   toward the beautiful state destroys the beautiful state. This must fall out of the physics
   (perturbation impact scales with how coherent the field currently is), not be a special case.
4. **The body won't yield to the head's technique.** The timing/clicking that synced the head
   region produces diminishing returns lower down — the body has its own slower rhythm and
   won't be "clicked" into line; it has to be entrained by the field's overall coherence.

### 5.3 The model

Standard Kuramoto with spatial structure:

- N oscillators (start ~400–800; tune for performance and visual density), each with:
  - position `(x, y)` inside the silhouette mask
  - phase `θ_i`
  - natural frequency `ω_i`
- Update each frame: `dθ_i/dt = ω_i + coupling_term + noise_term`
- **Coupling:** blend of (a) **local** coupling to nearby oscillators (distance-weighted) —
  this produces travelling waves / ripples that "bounce and refract" across the field — and
  (b) a weaker **global** mean-field term that pulls everything toward overall coherence.
  Local-heavy gives the wave aesthetic; the global term ensures eventual global sync.
- **Order parameter / coherence:** `r = | (1/N) Σ exp(i·θ_j) |`, where `r ≈ 1` is fully
  synced and `r ≈ 0` is incoherent. Compute `r` globally and per-region. This drives both the
  visuals and the stage logic — but is **never shown as a number**.

### 5.4 The three regions (head / heart-body / gut) and "world"

Partition the silhouette oscillators into three clusters with different parameters:

- **Head cluster:** higher natural frequency, **strong** coupling to user input. Syncs first
  and most easily — responds well to well-timed clicks. (Represents cognitive settling.)
- **Heart/body cluster:** medium frequency, **weaker** coupling to input. The click technique
  that worked on the head gives diminishing returns here.
- **Gut cluster:** lower, more stubborn frequency, **weakest** coupling to input. Barely
  responds to the cursor at all — it only comes into line when entrained by overall body
  coherence. (Represents somatic integration that can't be forced.)

- **"World":** a field of oscillators *outside* the silhouette (filling the rest of the
  canvas). These have **no coupling to user input whatsoever** — the cursor cannot touch them.
  They only entrain when whole-silhouette coherence is high and *sustained without input*.
  When the world syncs, the whole screen becomes one coherent field. This is the deepest,
  most beautiful state and is reachable only by *not acting*.

### 5.5 User input

- A click (or tap/drag) injects a **local phase nudge** at the cursor location, within some
  radius, weighted by the local coupling strength of whichever region is there.
- If the nudge is roughly **in-phase** with local oscillators, it pulls them toward
  coherence (helps). If **off-phase**, it adds turbulence (hurts). So *well-timed* gentle
  input helps the head sync; mistimed or frantic input degrades everything.
- **Hidden chaos variable:** track the user's recent input *rate* (clicks per second over a
  sliding window). Higher rate raises a **noise floor** added to every oscillator's frequency.
  Over-driving the field keeps the noise floor high and makes full sync impossible. When input
  stops, the noise floor **decays** over a few seconds and the natural sync dynamics take over.
- Perturbation magnitude of any single click should scale up with current global coherence `r`
  (a tap on a settled field disturbs more than a tap on chaos) — this is what makes the
  "grasp at the synced state breaks it" beat emerge naturally.

### 5.6 The no-UI constraint (this is load-bearing — do not violate it)

The realisation has to arrive **felt, not solved**. If anything in the UI hints that inaction
is the winning strategy, players will meta-game it instantly and the entire teaching collapses.

Therefore:
- **No score, no timer, no progress bar, no coherence meter, no instructions about what to do.**
- **No win screen, no congratulations, no "level complete."** The synced states are their own
  reward — purely aesthetic feedback (coherence vs. noise).
- It should *look like* an ordinary interactive toy / optimisation puzzle: there's a field,
  there's a cursor that does something, there are obvious things to try. The frustration of
  effort builds naturally. At some point the user stops — out of fatigue or curiosity — and
  notices the field resolving on its own. No fanfare.
- At most **one ambiguous line** of framing on entry (e.g. the title and nothing else, or a
  single oblique sentence). The real instruction is nowhere in the text.

### 5.7 Visuals

- Render each oscillator's phase as **brightness and/or hue** (e.g. phase → position on a
  cycle → brightness pulse). Coherent neighbours pulse together; the silhouette appears as a
  region pulsing in unison against noise.
- Aim for **genuine beauty in the synced state** — soft, breathing, shimmering coherence, not
  a flat "all cells the same colour." Travelling waves from the local coupling should be
  visible rippling through the field. This is the make-or-break aesthetic work; expect many
  tuning passes (see 5.9).
- Respect `prefers-reduced-motion`: offer a calmer, slower variant rather than disabling it
  entirely (the motion is the content), but never strobe — keep brightness changes gentle and
  below any flash thresholds.

### 5.8 The ending

When full coherence (silhouette + world) is reached and held, the **cursor fades and
disappears entirely** — "there's no one left to hold it." The field continues breathing on its
own. Nothing else happens. No screen, no text, no reset prompt. (A quiet, unobtrusive way to
restart can exist, e.g. a tiny corner affordance, but it must not read as a "play again" CTA.)

### 5.9 Build & tuning notes for Claude Code

- **The code is the easy part; the *feel* is the whole thing.** Implement the model cleanly,
  then expect a long iterative loop tuning constants: coupling strengths per region, natural
  frequencies, noise-floor decay rate, click perturbation radius/magnitude, the coherence
  thresholds for each stage, and the colour/brightness mapping. Build with **all of these as
  easily-adjustable constants at the top of the file**, ideally with a hidden dev-only panel
  (toggled by a key combo, never visible to end users) to live-tweak them during tuning.
- **Audio is ~40% of the emotional landing** but build it second. A drone/pad that comes into
  harmonic coherence as the field syncs (dissonant when noisy, consonant when coherent) would
  carry enormous weight. Use the Web Audio API or Tone.js. Make it muted by default with a
  quiet unobtrusive unmute, and ensure the visual works fully on its own first.
- Performance: this must run smoothly on a mid-range phone. If N oscillators with pairwise
  local coupling is too heavy, use a spatial grid / neighbour bucketing, or compute coupling
  on a coarser field and interpolate. Target 60fps; degrade N gracefully on weak devices.

---

## 6. The closing loop (a property of the collection, not any single piece)

The owner wants the anthology *as a whole* to have no outermost frame — to quietly point back
at the reader/viewer at the end, the way the individual pointers fold back on themselves.

Implementation: keep this as a property that can be added once enough pieces exist. The last
item in a "read in sequence" path (if one is offered) should be a piece that turns attention
back on the one reading — the unsigned-painter / who-is-looking move. For now, just don't build
anything that asserts a final "you've completed the collection" terminus. Leave the structure
open.

A natural sequence order, if a "guided path" is ever offered (never forced — the default is
free browsing of the list): the pieces that dissolve *views* first (puppet, mirror, chair,
Play-Doh, letter), then the ones that work on *time and feeling* (movie, sync field), then the
ones reaching at *seeking and the residual centre* (rope climber, and the closing loop). This
mirrors a path progression without ever naming or numbering it.

---

## 7. Suggested build order

1. **Scaffold**: shell, `site.css` design tokens, `pointers.json` manifest, index page that
   renders from the manifest. Deploy a near-empty site to Cloudflare Pages to prove the pipeline.
2. **Text pointers**: drop in the five ready prose pieces. Now the site has real content and a
   URL to share. This already beats leaving them as Reddit comments.
3. **Movie Projector**: first interactive — cleanest proof that the interactive pattern works.
4. **Rope Climber**: image-series viewer with the delayed reveal.
5. **Letter Trap**: the free-will interactive upgrade.
6. **Sync Field**: the centrepiece. Its own extended build + tuning effort.

Each step ships independently. Never block shipping earlier pieces on later ones being ready.
