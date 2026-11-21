// Default document shown on first launch. "§" stands for a backtick so fences can live inside this template literal.
// HTML blocks below deliberately contain no blank lines or 4-space indents so Markdown does not break them apart.
window.WELCOME_MD = String.raw`<div style="background:linear-gradient(135deg,#ff3d81 0%,#8b3dff 52%,#19c3ff 100%);border-radius:28px;position:relative;padding:64px 28px 56px;text-align:center;color:#fff;box-shadow:0 20px 60px rgba(139,61,255,.35)">
<div style="position:absolute;top:-16px;left:-16px;width:124px;height:124px;transform:rotate(-10deg);filter:drop-shadow(0 8px 14px rgba(0,0,0,.35))" title="Renders locally"><svg width="124" height="124" viewBox="0 0 124 124" aria-hidden="true"><defs><linearGradient id="offg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ee6a6"/><stop offset=".5" stop-color="#19c3ff"/><stop offset="1" stop-color="#8b3dff"/></linearGradient></defs><circle cx="62" cy="62" r="58" fill="url(#offg)" stroke="#fff" stroke-width="4"/><circle cx="62" cy="62" r="49" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5" stroke-dasharray="3 4"/><g transform="translate(34 22) scale(2.3)" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M5 12.9a10 10 0 0 1 5.2-2.7"/><path d="M13.8 10.2A10 10 0 0 1 19 12.9"/><path d="M2 8.8a15 15 0 0 1 4.2-2.6"/><path d="M10 6.1A15 15 0 0 1 22 8.8"/><path d="M2 2l20 20" stroke="#ffd23f" stroke-width="2.3"/></g><text x="62" y="92" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="17" font-weight="900" fill="#fff">100%</text><text x="62" y="106" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="10.5" font-weight="900" letter-spacing="1.5" fill="#fff">OFFLINE</text></svg></div>
<div style="display:inline-block;font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;background:rgba(255,255,255,.18);padding:7px 16px;border-radius:999px">Markdown · Diagrams · Math · Offline</div>
<div style="font-size:clamp(34px,6vw,60px);font-weight:800;line-height:1.05;margin:22px 0 14px;letter-spacing:-.02em">Write. Diagram. Ship.</div>
<div style="font-size:18px;line-height:1.55;max-width:680px;margin:0 auto 28px;opacity:.96">The fastest private workspace for <b>Markdown</b> and <b>diagrams as code</b>. Live preview, three diagram engines, LaTeX math, 14 themes and one-click PDF — all running on your device.</div>
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
<span style="background:#fff;color:#8b3dff;font-weight:700;padding:11px 22px;border-radius:999px">✏️ Start typing on the left</span>
<span style="background:rgba(255,255,255,.2);font-weight:600;padding:11px 22px;border-radius:999px"><svg width="18" height="18" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> Open a .md file</span>
<span style="background:rgba(255,255,255,.2);font-weight:600;padding:11px 22px;border-radius:999px">🎨 Try a theme</span>
</div>
<div style="font-size:14px;opacity:.9;margin-top:26px">Made for architects, engineers and writers who think in text and diagrams — and a clean reading experience for executives.</div>
</div>

<div class="cz">
<div class="cz-track">
<figure class="cz-slide"><img src="help/all-themes.png" alt="All 14 themes"><figcaption><b>14 themes</b> — Light, dark and paper looks, all one click away.</figcaption></figure>
<figure class="cz-slide"><img src="help/offline.png" alt="Works offline"><figcaption><b>Works offline</b> — Every engine is bundled. Nothing is uploaded.</figcaption></figure>
<figure class="cz-slide"><img src="help/diagram-colors.png" alt="Diagram colour palettes"><figcaption><b>8 diagram colour palettes</b> — Match your theme or pick Default, Vibrant, Pastel, Ocean, Sunset or Forest.</figcaption></figure>
<figure class="cz-slide"><img src="help/all-diagrams.png" alt="All diagram types"><figcaption><b>Every diagram type</b> — Mermaid, D2 and Graphviz: flowchart, sequence, Gantt, timeline, state, ER and full architectures.</figcaption></figure>
<figure class="cz-slide"><img src="help/pdf-export.png" alt="Export PDF in your theme"><figcaption><b>Export PDF in your theme</b> — The PDF keeps the selected theme's colours and diagrams.</figcaption></figure>
<figure class="cz-slide"><img src="help/overview.png" alt="Live split view"><figcaption><b>Live split view</b> — Type on the left, see the result on the right instantly.</figcaption></figure>
<figure class="cz-slide"><img src="help/collapsed.png" alt="Focus mode"><figcaption><b>Focus mode</b> — Hide the source pane for a full-width preview.</figcaption></figure>
<figure class="cz-slide"><img src="help/toolbar.png" alt="Toolbar and rail"><figcaption><b>Toolbar and rail</b> — Every formatting action is one click away.</figcaption></figure>
<figure class="cz-slide"><img src="help/theme-menu.png" alt="Pick a theme"><figcaption><b>Pick a theme</b> — 14 themes from one menu. Your choice is remembered.</figcaption></figure>
<figure class="cz-slide"><img src="help/theme-dark.png" alt="Dark theme"><figcaption><b>Dark theme</b> — Text and diagrams recolour together.</figcaption></figure>
<figure class="cz-slide"><img src="help/theme-paper.png" alt="Paper theme"><figcaption><b>Paper theme</b> — A warm, print-like reading mode.</figcaption></figure>
<figure class="cz-slide"><img src="help/theme-plain.png" alt="Plain theme"><figcaption><b>Plain theme</b> — Flat, white and distraction-free.</figcaption></figure>
</div>
<button class="cz-btn cz-prev" aria-label="Previous">‹</button>
<button class="cz-btn cz-next" aria-label="Next">›</button>
<div class="cz-dots"><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button><button class="cz-dot" aria-label="Slide"></button></div>
</div>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:12px;margin:22px 0">
<div style="text-align:center;padding:20px 10px;border-radius:18px;background:rgba(255,61,129,.12);border:1px solid rgba(255,61,129,.35)"><div style="font-size:34px;font-weight:800;color:#ff3d81">3</div><div style="font-size:13px;opacity:.8">diagram engines</div></div>
<div style="text-align:center;padding:20px 10px;border-radius:18px;background:rgba(255,159,28,.12);border:1px solid rgba(255,159,28,.4)"><div style="font-size:34px;font-weight:800;color:#ff9f1c">14</div><div style="font-size:13px;opacity:.8">themes</div></div>
<div style="text-align:center;padding:20px 10px;border-radius:18px;background:rgba(25,195,255,.12);border:1px solid rgba(25,195,255,.4)"><div style="font-size:34px;font-weight:800;color:#19c3ff">8</div><div style="font-size:13px;opacity:.8">diagram palettes</div></div>
<div style="text-align:center;padding:20px 10px;border-radius:18px;background:rgba(46,230,166,.12);border:1px solid rgba(46,230,166,.4)"><div style="font-size:34px;font-weight:800;color:#2ee6a6">0</div><div style="font-size:13px;opacity:.8">bytes uploaded</div></div>
<div style="text-align:center;padding:20px 10px;border-radius:18px;background:rgba(139,61,255,.12);border:1px solid rgba(139,61,255,.4)"><div style="font-size:34px;font-weight:800;color:#8b3dff">∞</div><div style="font-size:13px;opacity:.8">offline, always</div></div>
</div>

## Everything you need, nothing you don't

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin:18px 0">
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #ff3d81"><div style="font-size:30px">📝</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Live Markdown</div><div style="font-size:14px;opacity:.85;line-height:1.55">Full GitHub-flavoured Markdown — tables, task lists, code, quotes, HTML — rendered the instant you type.</div></div>
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #ff9f1c"><div style="font-size:30px">📊</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Diagrams as code</div><div style="font-size:14px;opacity:.85;line-height:1.55">Mermaid, D2 and Graphviz in one document. Flowcharts, sequences, Gantt, ER, timelines, state machines, architecture and more.</div></div>
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #19c3ff"><div style="font-size:30px">🧮</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Beautiful math</div><div style="font-size:14px;opacity:.85;line-height:1.55">Inline and block LaTeX typeset by KaTeX — publication-quality equations without leaving the page.</div></div>
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #8b3dff"><div style="font-size:30px">🎨</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Designer themes</div><div style="font-size:14px;opacity:.85;line-height:1.55">14 light and dark looks plus 8 diagram palettes. Text <i>and</i> diagrams recolour together.</div></div>
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #2ee6a6"><div style="font-size:30px">🔒</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Private by design</div><div style="font-size:14px;opacity:.85;line-height:1.55">No accounts, no servers, no tracking. All rendering is local and every bit of HTML is sanitised.</div></div>
<div style="padding:22px;border-radius:18px;background:rgba(128,128,128,.07);border:1px solid rgba(128,128,128,.25);border-top:5px solid #ffd23f"><div style="font-size:30px">⚡</div><div style="font-weight:700;font-size:17px;margin:8px 0 6px">Built for flow</div><div style="font-size:14px;opacity:.85;line-height:1.55">Real file saving, draft recovery, synced scrolling, live word counts and PDF export.</div></div>
</div>

---

## 📊 Diagrams that draw themselves

Put a diagram in a fenced block labelled §mermaid§, §d2§ or §dot§. That is the whole setup.
Hover any diagram for its toolbar — ＋ zoom in, － zoom out, ⟲ reset, ⬇ download SVG, ⛶ maximize. **Drag** to pan, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + scroll to zoom, **double-click** to go full screen, <kbd>Esc</kbd> to exit.

### Flowchart — your document's journey

~~~mermaid
flowchart LR
    A([Open or paste Markdown]) --> B{Contains diagrams?}
    B -- Yes --> C[Render SVG offline]
    B -- No --> D[Render HTML]
    C --> E[Apply theme + palette]
    D --> E
    E --> F([Save, copy or export PDF])
~~~

### Sequence — what happens when you type

~~~mermaid
sequenceDiagram
    autonumber
    actor You
    participant Editor
    participant Engine as Render engine
    participant Preview
    You->>Editor: Type Markdown
    Editor->>Engine: Debounced change (300 ms)
    Engine->>Engine: Parse, sanitise, typeset math
    Engine-->>Preview: Swap in the new view
    Preview-->>You: Instant, flicker-free result
    Note over Editor,Preview: Everything stays on your device
~~~

### Architecture with D2

~~~d2
direction: right

user: You {shape: person}
app: Markdown & Diagram Viewer {
  editor: Editor
  engine: Render engine
  preview: Live preview
  editor -> engine: text
  engine -> preview: sanitised HTML + SVG
}
disk: Local files {shape: cylinder}
pdf: PDF {shape: page}

user -> app.editor: writes
app.editor -> disk: save
app.preview -> pdf: export
~~~

### Graphs with Graphviz

~~~dot
digraph Stack {
  rankdir=LR;
  node [shape=box, style="rounded,filled", fontname="Helvetica"];
  Markdown -> Parser -> Sanitizer -> Preview;
  Parser -> Mermaid [label="mermaid"];
  Parser -> D2 [label="d2"];
  Parser -> Graphviz [label="dot"];
  Mermaid -> Preview; D2 -> Preview; Graphviz -> Preview;
  Preview -> PDF [style=dashed];
}
~~~

### Going big — a full platform in one diagram

~~~mermaid
flowchart TB
    subgraph Clients["Clients"]
        direction LR
        Web([Web app]) ~~~ Mobile([Mobile app]) ~~~ Partner([Partner API])
    end
    subgraph Edge["Edge and security"]
        direction LR
        CDN[CDN] --> WAF{{WAF}} --> GW[API gateway]
        GW --> Auth[[Identity provider]]
    end
    subgraph Core["Core services"]
        direction LR
        Orders[Orders] --> Billing[Billing]
        Orders --> Inventory[Inventory]
        Users[Users] --> Orders
        Search[Search] -.-> Inventory
    end
    subgraph Data["Data layer"]
        direction LR
        PG[(PostgreSQL)]
        Cache[(Redis)]
        Blob[(Object store)]
        Index[(Search index)]
    end
    subgraph Async["Events and analytics"]
        direction LR
        Bus>Event bus] --> Worker[Workers]
        Bus --> Stream[Stream processor]
        Stream --> Lake[(Data lake)]
        Lake --> BI[Dashboards]
    end
    subgraph Ops["Observability"]
        direction LR
        Logs[Logs] --> Alerts{Threshold?}
        Metrics[Metrics] --> Alerts
        Alerts -- yes --> Pager([On-call])
        Alerts -- no --> Dash[Health board]
    end
    Web --> CDN
    Mobile --> CDN
    Partner --> WAF
    GW --> Orders
    GW --> Users
    GW --> Search
    Orders --> PG
    Users --> PG
    Billing --> PG
    Inventory --> Cache
    Inventory --> Blob
    Search --> Index
    Orders ==> Bus
    Billing ==> Bus
    Worker --> Blob
    Core -.-> Logs
    Core -.-> Metrics
    Edge -.-> Logs
    classDef hot fill:#ff3d81,stroke:#b3004b,color:#fff
    classDef store fill:#19c3ff,stroke:#0a7fb0,color:#00323f
    class Orders,Billing hot
    class PG,Cache,Blob,Index,Lake store
~~~

### Plan, model and tell the story

~~~mermaid
gantt
    title Launch plan
    dateFormat YYYY-MM-DD
    axisFormat %b %d
    tickInterval 1week
    section Build
    Write content      :done, a1, 2026-01-05, 14d
    Add diagrams       :a2, after a1, 14d
    section Launch
    Polish and test    :a3, after a2, 10d
    Publish            :milestone, after a3, 0d
~~~

~~~mermaid
timeline
    title Your documentation workflow
    Draft : Type Markdown : Add headings
    Visualise : Mermaid : D2 : Graphviz
    Polish : Pick a theme : Check the math
    Share : Export PDF : Download SVG
~~~

~~~mermaid
stateDiagram-v2
    [*] --> Clean
    Clean --> Dirty: you edit
    Dirty --> Clean: save
    Dirty --> Clean: reset
    Dirty --> Draft: auto-backup
    Draft --> Dirty: recover
~~~

~~~mermaid
erDiagram
    DOCUMENT ||--o{ DIAGRAM : contains
    DOCUMENT ||--o{ FORMULA : contains
    DOCUMENT }o--|| THEME : "styled by"
    THEME ||--|| PALETTE : pairs
~~~

---

## ✍️ Markdown, fully loaded

### Text and inline styles

**Bold**, *italic*, ***both***, ~~strikethrough~~, §inline code§, and [links](https://commonmark.org) combine freely — **bold with §code§**, *italic with a [link](https://commonmark.org)*.
Inline HTML works too: <kbd>Ctrl</kbd> + <kbd>S</kbd>, H<sub>2</sub>O, x<sup>2</sup>, <mark>highlights</mark>, <abbr title="HyperText Markup Language">HTML</abbr>.

Line breaks are kept exactly as typed,
so addresses and poetry just work.

### Callouts

<div style="display:grid;gap:12px;margin:14px 0">
<div style="padding:14px 18px;border-radius:14px;background:rgba(25,195,255,.12);border-left:5px solid #19c3ff"><b>💡 Tip</b> — Select text and press a toolbar button to wrap it, or just type the syntax yourself.</div>
<div style="padding:14px 18px;border-radius:14px;background:rgba(46,230,166,.12);border-left:5px solid #2ee6a6"><b>✅ Success</b> — Saved back to the original file. No downloads folder clutter.</div>
<div style="padding:14px 18px;border-radius:14px;background:rgba(255,159,28,.14);border-left:5px solid #ff9f1c"><b>⚠️ Heads up</b> — Unsaved edits trigger a warning before you leave the page.</div>
<div style="padding:14px 18px;border-radius:14px;background:rgba(255,61,129,.12);border-left:5px solid #ff3d81"><b>⛔ Careful</b> — Reset throws away all edits and restores the original content.</div>
</div>

### Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Lists and tasks

- 🍎 Bulleted
  - Nested
    - And deeper
- 🥕 Another item

1. Numbered
2. Lists
3. Included

- [x] Render Markdown
- [x] Render diagrams
- [x] Export to PDF
- [ ] Take over the world 🌍

### Quotes

> “Simplicity is the ultimate sophistication.”
>
> > Nested quotes work too — great for replies.
>
> — *Leonardo da Vinci (attributed)*

### Tables with alignment

| Plan | Price | Seats | Support |
|:-----|------:|:-----:|---------|
| Free | $0 | 1 | Community |
| Team | $12 | 10 | Email |
| Business | $49 | 100 | **Priority** |

### Syntax-highlighted code

~~~javascript
// Debounced live preview
const render = debounce(async (md) => {
  preview.innerHTML = DOMPurify.sanitize(marked.parse(md));
}, 300);
~~~

~~~python
from dataclasses import dataclass

@dataclass
class Note:
    title: str
    body: str

    def words(self) -> int:
        return len(self.body.split())
~~~

~~~csharp
public record Order(int Id, decimal Total);

var big = orders.Where(o => o.Total > 100m).OrderByDescending(o => o.Total);
~~~

~~~sql
SELECT customer, SUM(total) AS spend
FROM orders
GROUP BY customer
ORDER BY spend DESC;
~~~

~~~bash
curl -s https://example.com/README.md | head -n 20
~~~

~~~json
{ "name": "markdown-viewer", "offline": true, "diagrams": ["mermaid", "d2", "dot"] }
~~~

### Math with LaTeX

Inline math like $E = mc^2$ or $\alpha + \beta = \gamma$ sits right inside a sentence.

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\hat{f}(\xi) = \int f(x)\, e^{-2\pi i x \xi}\, dx \qquad \sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

### Images and rules

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 90" style="width:100%;max-width:560px;display:block;margin:12px 0"><defs><linearGradient id="wg" x1="0" x2="1"><stop offset="0" stop-color="#ff3d81"/><stop offset=".5" stop-color="#8b3dff"/><stop offset="1" stop-color="#19c3ff"/></linearGradient></defs><rect width="560" height="90" rx="18" fill="url(#wg)"/><text x="280" y="57" font-family="sans-serif" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">Inline SVG &amp; images work too</text></svg>

---

## 🎨 Make it yours

Open the 🎨 **Theme** button on the side rail. Every theme restyles the page *and* recolours your diagrams.

<div style="display:flex;flex-wrap:wrap;gap:10px;margin:14px 0">
<span style="padding:9px 16px;border-radius:12px;background:#ffffff;color:#4a4a4c;border:2px solid #fbb423;font-weight:600">Default</span>
<span style="padding:9px 16px;border-radius:12px;background:#262628;color:#eeefef;border:2px solid #fbb423;font-weight:600">Default Dark</span>
<span style="padding:9px 16px;border-radius:12px;background:#ffffff;color:#111827;border:2px solid #374151;font-weight:600">Plain</span>
<span style="padding:9px 16px;border-radius:12px;background:#ffffff;color:#1f2328;border:2px solid #6366f1;font-weight:600">Indigo Light</span>
<span style="padding:9px 16px;border-radius:12px;background:#141a2e;color:#e5e7ff;border:2px solid #818cf8;font-weight:600">Indigo Dark</span>
<span style="padding:9px 16px;border-radius:12px;background:#ffffff;color:#1f2328;border:2px solid #0969da;font-weight:600">GitHub Light</span>
<span style="padding:9px 16px;border-radius:12px;background:#0d1117;color:#e6edf3;border:2px solid #58a6ff;font-weight:600">GitHub Dark</span>
<span style="padding:9px 16px;border-radius:12px;background:#f4ecd8;color:#433422;border:2px solid #b45309;font-weight:600">Paper</span>
<span style="padding:9px 16px;border-radius:12px;background:#fdf6e3;color:#586e75;border:2px solid #268bd2;font-weight:600">Solarized Light</span>
<span style="padding:9px 16px;border-radius:12px;background:#073642;color:#93a1a1;border:2px solid #2aa198;font-weight:600">Solarized Dark</span>
<span style="padding:9px 16px;border-radius:12px;background:#2e3440;color:#eceff4;border:2px solid #88c0d0;font-weight:600">Nord</span>
<span style="padding:9px 16px;border-radius:12px;background:#282a36;color:#f8f8f2;border:2px solid #bd93f9;font-weight:600">Dracula</span>
<span style="padding:9px 16px;border-radius:12px;background:#1a1b26;color:#c0caf5;border:2px solid #7aa2f7;font-weight:600">Tokyo Night</span>
<span style="padding:9px 16px;border-radius:12px;background:#272822;color:#f8f8f2;border:2px solid #a6e22e;font-weight:600">Monokai</span>
</div>

**Diagram palettes:** Match theme · Default · Default Dark · Vibrant · Pastel · Ocean · Sunset · Forest

---

## 🧰 Tool tour

### Editor toolbar

Click to format — no syntax to memorise.

| Button | Inserts | Shortcut |
|---|---|---|
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/></svg> | Undo / redo | <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h8M4 18V6M12 18V6"/><path d="m17 12 3-2v8"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h8M4 18V6M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h8M4 18V6M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/></svg> | Headings | |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h6a4 4 0 0 1 0 8H7zM7 12h7a4 4 0 0 1 0 8H7z"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4h7M6 20h7M15 4 9 20"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M17 7c-.5-1.8-2.3-3-5-3-3 0-4.5 1.5-4.5 3.5 0 1.3.8 2.2 2.5 2.8"/><path d="M13 14c2 .6 3.5 1.7 3.5 3.5 0 2-1.8 3.5-4.5 3.5-2.7 0-4.3-1.3-5-3"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg> | Bold, italic, strike, inline code | <kbd>Ctrl</kbd> + <kbd>B</kbd> / <kbd>Ctrl</kbd> + <kbd>I</kbd> |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 6h1v4M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4M13 6h8M13 18h8"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path fill="currentColor" stroke="none" d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/></svg> | Bullet, numbered, task list, quote | |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg> | Link and image | <kbd>Ctrl</kbd> + <kbd>K</kbd> |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg> <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/></svg> | Table, code block, divider | |
| <svg width="18" height="18" style="vertical-align:-4px;margin-right:6px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/></svg> | A ready-to-edit Mermaid diagram | |

*On macOS use <kbd>⌘</kbd> in place of <kbd>Ctrl</kbd>.*

### Side rail

| Control | What it does |
|---|---|
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> **Open** | Pick a Markdown file; **Save** writes back to the *same* file |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg> **Save** | Lights up when there are unsaved changes — <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>S</kbd> |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> **Copy Markdown** | Puts the full source on your clipboard |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .4-2.1 1.5-2.1H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/></svg> **Theme** | 14 page themes and 8 diagram palettes |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z"/><path d="M14 2.5V8h5.5"/><text x="12" y="17.2" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="6.2" font-weight="800" fill="currentColor" stroke="none">PDF</text></svg> **PDF** | Exports the preview exactly as themed |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg> **Reset** | Discards edits and restores the original |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg> **Clear** | Empties the editor for a fresh document (asks first) |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg> **Sync scroll** | Keeps editor and preview aligned |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> **Help** | Reopens this guide any time |
| <svg width="18" height="18" style="vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m16 10-2 2 2 2"/></svg> **Hide source** | Collapse the editor for a clean reading view |

### Layout and navigation behaviour

| Action | How it works |
|---|---|
| **Hide the source pane** | Click <svg width="16" height="16" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m16 10-2 2 2 2"/></svg> on the rail, or drag the divider all the way to the left. The preview expands to full width for reading. |
| **Show it again** | Click <svg width="16" height="16" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m16 10-2 2 2 2"/></svg> again, click anywhere on the empty rail, or drag the rail to the right to pull the pane back out. |
| **Resize the panes** | Drag the divider between editor and preview (the editor stays between 15% and 80% of the window). |
| **Sync scroll** | Scrolling either side moves the other proportionally. Toggle it with the <svg width="16" height="16" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg> button; your choice is remembered. |
| **Back to top** | A round button appears in the preview corner after you scroll down; click it to glide back to the top. |
| **Theme menu** | Opens from <svg width="16" height="16" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .4-2.1 1.5-2.1H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/></svg>; pick a theme or diagram palette, close it with <kbd>Esc</kbd> or by clicking elsewhere. Your choice is remembered. |
| **Maximize a diagram** | Double-click it or use ⛶; press <kbd>Esc</kbd> to return. |
| **Copy feedback** | The <svg width="16" height="16" style="vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy button briefly turns into a ✓ to confirm. |
| **Save state** | A ● appears after the file name and Save lights up while there are unsaved changes; Reset is available until you save. |
| **PDF export** | Exports only the rendered preview in the selected theme's colours (background, accents, code and diagram palette) — the editor, rail and buttons are left out. |
| **Redo** | <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd> + <kbd>Y</kbd>. |

### Little details that add up

- 📐 **Drag the divider** to resize editor and preview.
- 🔢 **Live counts** — characters, words and lines under the editor.
- 🛟 **Draft recovery** — close the tab by accident and your unsaved text returns.
- ⬆️ **Back to top** appears as you scroll.
- 🌐 **Extension mode** — open any §.md§ file (or a raw GitHub / Gist file) and it renders here. For local files, enable *Allow access to file URLs* on the extension's Details page.

---

## ⚖️ Why people switch

| | Typical online editors | **Markdown & Diagram Viewer** |
|---|:-:|:-:|
| Works fully offline | ❌ | ✅ |
| Your text stays on your device | ❌ | ✅ |
| Mermaid + D2 + Graphviz together | ❌ | ✅ |
| LaTeX math | ⚠️ | ✅ |
| Diagram zoom, pan, SVG export | ⚠️ | ✅ |
| Themes that also recolour diagrams | ❌ | ✅ |
| Saves back to the original file | ❌ | ✅ |
| Draft recovery | ⚠️ | ✅ |

<div style="background:linear-gradient(135deg,#19c3ff 0%,#8b3dff 55%,#ff3d81 100%);border-radius:28px;padding:44px 24px;text-align:center;color:#fff;margin:34px 0 10px">
<div style="font-size:clamp(26px,4vw,38px);font-weight:800;margin-bottom:10px">Ready? It's your turn. 🚀</div>
<div style="font-size:16px;max-width:560px;margin:0 auto;opacity:.95;line-height:1.55">Delete this page and paste your own Markdown, or press <b>Open</b> to load a file. Switch themes any time — your diagrams recolour with them.</div>
</div>

`.replace(/§/g, '`');

// Website only (the extension keeps the layout above): the banner becomes the carousel's first slide,
// and the comparison table moves up to sit right below the carousel.
if (location.protocol !== 'chrome-extension:') {
  let md = window.WELCOME_MD;
  const carouselAt = md.indexOf('\n\n<div class="cz">');
  const hero = md.slice(0, carouselAt)
    .replace('<div style="background:', '<div class="cz-slide cz-hero" style="background:')
    .replace('border-radius:28px;position:relative;padding:64px 28px 56px', 'position:relative;padding:56px 64px 44px')
    .replace(';box-shadow:0 20px 60px rgba(139,61,255,.35)', '')
    .replace('<div style="position:absolute;top:-16px;left:-16px;', '<div class="cz-badge" style="position:absolute;top:12px;left:12px;transform-origin:top left;');
  md = md.slice(carouselAt).trimStart()
    .replace('<div class="cz-track">\n', '<div class="cz-track">\n' + hero + '\n')
    .replace('<div class="cz-dots">', '<div class="cz-dots"><button class="cz-dot" aria-label="Slide"></button>');
  const switchAt = md.indexOf('---\n\n## ⚖️ Why people switch');
  const ctaAt = md.indexOf('<div style="background:linear-gradient(135deg,#19c3ff', switchAt);
  const compare = md.slice(switchAt + 5, ctaAt).trim();
  md = md.slice(0, switchAt) + md.slice(ctaAt);
  const statsAt = md.indexOf('\n\n<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px');
  window.WELCOME_MD = md.slice(0, statsAt) + '\n\n' + compare + md.slice(statsAt);
}
