/* Pointers — shared shell.
   Two jobs: render the index from the manifest, and render a text
   pointer from its own pointer.md. Vanilla, no dependencies.
   Note: uses fetch(), so it must be served over http(s) (a static
   server locally, Cloudflare Pages in production), not file://. */

/* --- A deliberately tiny Markdown renderer ---
   Scope is only what the pointers use: an H1/H2, blank-line-separated
   paragraphs, and inline *em* / **strong**. Nothing more. */
function renderMarkdown(md) {
  const escape = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const inline = (s) =>
    escape(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  const blocks = md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      if (/^#\s+/.test(lines[0]) && lines.length === 1)
        return `<h1>${inline(lines[0].replace(/^#\s+/, ""))}</h1>`;
      if (/^##\s+/.test(lines[0]) && lines.length === 1)
        return `<h2>${inline(lines[0].replace(/^##\s+/, ""))}</h2>`;
      return `<p>${inline(lines.join(" "))}</p>`;
    })
    .join("\n");
}

/* Render a single text pointer into <main> from ./pointer.md */
async function initPointer() {
  const main = document.querySelector("main.pointer");
  if (!main) return;
  try {
    const res = await fetch("./pointer.md", { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    const md = await res.text();
    main.innerHTML = renderMarkdown(md);
    // Use the H1 for the tab title, but don't show it — pointers jump straight to the prose.
    const h1 = main.querySelector("h1");
    if (h1) { document.title = h1.textContent + " — Pointers"; h1.remove(); }
  } catch (e) {
    main.innerHTML =
      '<p class="empty">This pointer needs to be viewed over http. ' +
      "Run a static server, or visit the deployed site.</p>";
  }
}

/* Render the index list from /pointers.json */
async function initIndex() {
  const list = document.querySelector("ul.pointer-list");
  if (!list) return;
  try {
    const res = await fetch("pointers.json", { cache: "no-cache" });
    const data = await res.json();
    const items = (data.pointers || [])
      .filter((p) => p.published)
      .sort((a, b) => a.order - b.order);

    if (!items.length) {
      list.innerHTML = '<li class="empty">Nothing here yet.</li>';
      return;
    }

    list.innerHTML = items
      .map(
        (p) =>
          `<li><a href="${p.path}"><span class="title">${p.title}</span>` +
          (p.blurb ? `<span class="blurb">${p.blurb}</span>` : "") +
          `</a></li>`
      )
      .join("\n");
  } catch (e) {
    list.innerHTML =
      '<li class="empty">Could not load the index over file://. ' +
      "Serve over http to view.</li>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPointer();
  initIndex();
});
