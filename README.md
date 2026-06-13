# Pointers

A small, growing anthology of contemplative "pointers" — short text pieces, image
series, and little interactive instruments, each built to trigger one direct
recognition. The reader does the operation and hits a wall; the piece doesn't
explain the conclusion.

Design brief and voice live in [`docs/`](docs/). Read
[`docs/VOICE.md`](docs/VOICE.md) before editing any pointer prose.

## How it's built

Pure static site — HTML, CSS, vanilla JS. No framework, no backend, no build step.
The index renders itself from a single manifest, so adding a pointer never touches
existing pieces.

```
index.html            renders the pointer list from the manifest
pointers.json         THE REGISTRY — single source of truth
styles/site.css       shared design tokens, typography, layout shell
lib/shell.js          loads the manifest; renders text pointers from their .md
pointers/<id>/        one folder per pointer
  index.html            the page (uses the shared shell + styles)
  pointer.md            (text pointers) the prose, editable as plain text
assets/               shared images, favicon, etc.
docs/                 build spec, voice guide, sync-field notes (not shipped as pages)
```

## Add a pointer

A **text** pointer:

1. `mkdir pointers/my-pointer`
2. Copy any existing `pointers/*/index.html` into it (the template is identical —
   it fetches its own `pointer.md`).
3. Write `pointers/my-pointer/pointer.md` (start with `# Title`).
4. Add one object to `pointers.json` (`"published": true`, pick an `order`).

Nothing else changes. Use `"published": false` to commit a piece before it's ready;
`order` gaps (10, 20, 30…) let you slot pieces anywhere without renumbering.

## Preview locally

`fetch()` needs http(s), so open it through a static server, not `file://`:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (Cloudflare Pages)

No build command. Framework preset: **None**. Build output directory: `/` (root).
Connect the repo and it serves the files as-is — unlimited free bandwidth, so a
Reddit spike won't cost anything.
