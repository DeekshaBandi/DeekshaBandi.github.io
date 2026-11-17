// D2's layout engine needs eval, which extension pages forbid, and browsers refuse Workers from file:// pages.
// Run the D2 worker script inside d2-sandbox.html (an iframe, sandboxed in extensions) behind the same Worker surface.
if (/^(file|chrome-extension|ms-browser-extension):$/.test(location.protocol) && !window.__d2Shim) {
  window.__d2Shim = true;
  const NativeWorker = window.Worker;
  window.Worker = class extends EventTarget {
    constructor(url, opts) {
      if (!/d2-worker\.js/.test(String(url))) return new NativeWorker(url, opts);
      super();
      this.onmessage = null; this.onerror = null;
      this.frame = document.createElement('iframe');
      this.frame.style.display = 'none';
      this.queue = [];
      this.ready = false;
      this.frame.addEventListener('load', () => { this.ready = true; this.queue.forEach(m => this.frame.contentWindow.postMessage(m, '*')); this.queue = []; });
      this.listener = e => {
        if (e.source !== this.frame.contentWindow) return;
        const ev = new MessageEvent('message', { data: e.data });
        this.dispatchEvent(ev);
        if (this.onmessage) this.onmessage(ev);
      };
      window.addEventListener('message', this.listener);
      this.frame.src = new URL('d2-sandbox.html', document.baseURI).href;
      document.body.appendChild(this.frame);
    }
    postMessage(m) {
      if (this.ready) this.frame.contentWindow.postMessage(m, '*'); else this.queue.push(m);
    }
    terminate() { window.removeEventListener('message', this.listener); this.frame.remove(); }
  };
}
document.getElementById('devYear').textContent = new Date().getFullYear();
  const sidebar = document.getElementById('sidebar');
  const resizer = document.getElementById('resizer');
  const toggleBtn = document.getElementById('toggleBtn');
  const changeHandlers = [];
  const ed = MDEditor.createEditor(document.getElementById('editor'), {
    placeholder: 'Paste Markdown or ```mermaid diagrams here...',
    onChange: () => changeHandlers.forEach(f => f())
  });
  const editor = {
    get value() { return ed.getValue(); },
    set value(v) { ed.setValue(v); updateStats(); },
    addEventListener(type, f) { changeHandlers.push(f); }
  };
  const mdBar = document.getElementById('mdToolbar');
  const MD_TIPS = { h1:'# Heading', h2:'## Heading', h3:'### Heading', bold:'**bold**', italic:'*italic*', strike:'~~strike~~', code:'`code`', ul:'- item', ol:'1. item', task:'- [ ] task', quote:'> quote', link:'[text](url)', image:'![alt](url)', table:'| a | b |', codeblock:'```lang', hr:'---', mermaid:'```mermaid' };
  mdBar.querySelectorAll('button[data-a]').forEach(b => { const t = MD_TIPS[b.dataset.a]; if (t) b.title += '\nMarkdown: ' + t; });
  mdBar.querySelectorAll('button').forEach(b => b.setAttribute('aria-label', b.title));
  mdBar.addEventListener('mousedown', e => e.preventDefault());
  mdBar.addEventListener('click', e => { const b = e.target.closest('button'); if (b) ed.exec(b.dataset.a); });
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');
  const ICONS = {
    panelHide: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m16 10-2 2 2 2"/></svg>',
    panelShow: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="m14 10 2 2-2 2"/></svg>',
  };
  const fileName = document.getElementById('fileName');
  const pdfBtn = document.getElementById('pdfBtn');
  const statusBadge = document.getElementById('statusBadge');

  // Preview themes: dark = true/false forces a mode, null follows the Dark/Light button
  const mmv = (bg, p, pt, pb, l, sec, ter, t, n) => ({ ...(bg ? { background: bg } : {}), primaryColor: p, primaryTextColor: pt, primaryBorderColor: pb, lineColor: l, secondaryColor: sec, tertiaryColor: ter, textColor: t, noteBkgColor: n });
  const THEMES = {
    bsw:       { name: 'Default', dark: false, bg: '#ffffff', c: '#fbb423', d2: 0, mm: mmv(null, '#fff1cf', '#4a4a4c', '#f0a500', '#f29a3a', '#eeefef', '#ffffff', '#4a4a4c', '#fff2d2') },
    bswdark:   { name: 'Default Dark', dark: true, bg: '#262628', c: '#fbb423', d2: 200, mm: mmv('#262628', '#3a3a3c', '#eeefef', '#fbb423', '#f29a3a', '#303032', '#262628', '#eeefef', '#4a4a4c') },
    plain:     { name: 'Plain', dark: false, bg: '#ffffff', c: '#374151', d2: 0, mm: mmv(null, '#f3f4f6', '#111827', '#6b7280', '#6b7280', '#e5e7eb', '#ffffff', '#111827', '#f9fafb') },
    default:   { name: 'Indigo Light', dark: false, bg: '#ffffff', c: '#6366f1' },
    indigodark:{ name: 'Indigo Dark', dark: true, bg: '#141a2e', c: '#818cf8' },
    github:    { name: 'GitHub Light', dark: false, bg: '#ffffff', c: '#0969da', d2: 1, mm: mmv(null, '#ddf4ff', '#1f2328', '#0969da', '#57606a', '#f6f8fa', '#ffffff', '#1f2328', '#fff8c5') },
    githubdark:{ name: 'GitHub Dark', dark: true, bg: '#0d1117', c: '#58a6ff', d2: 200, mm: mmv('#161b22', '#1f3a5f', '#e6edf3', '#58a6ff', '#8b949e', '#21262d', '#161b22', '#e6edf3', '#3d3a1f') },
    paper:     { name: 'Paper', dark: false, bg: '#f4ecd8', c: '#b45309', d2: 105, mm: mmv(null, '#f1e0b8', '#433422', '#b45309', '#8a6a3b', '#e8d9b5', '#fbf5e6', '#433422', '#fdf0c4') },
    solarized: { name: 'Solarized Light', dark: false, bg: '#fdf6e3', c: '#268bd2', d2: 103, mm: mmv(null, '#eee8d5', '#073642', '#268bd2', '#586e75', '#fdf6e3', '#fdf6e3', '#586e75', '#fdf6e3') },
    solarizeddark:{ name: 'Solarized Dark', dark: true, bg: '#073642', c: '#2aa198', d2: 200, mm: mmv('#073642', '#0b4a5a', '#eee8d5', '#2aa198', '#93a1a1', '#0e5163', '#073642', '#93a1a1', '#586e75') },
    nord:      { name: 'Nord', dark: true, bg: '#2e3440', c: '#88c0d0', d2: 4, mm: mmv('#2e3440', '#3b4252', '#eceff4', '#88c0d0', '#81a1c1', '#434c5e', '#2e3440', '#d8dee9', '#4c566a') },
    dracula:   { name: 'Dracula', dark: true, bg: '#282a36', c: '#bd93f9', d2: 200, mm: mmv('#282a36', '#44475a', '#f8f8f2', '#bd93f9', '#ff79c6', '#343746', '#282a36', '#f8f8f2', '#44475a') },
    tokyo:     { name: 'Tokyo Night', dark: true, bg: '#1a1b26', c: '#7aa2f7', d2: 201, mm: mmv('#1a1b26', '#24283b', '#c0caf5', '#7aa2f7', '#bb9af7', '#2f334d', '#1a1b26', '#c0caf5', '#2f334d') },
    monokai:   { name: 'Monokai', dark: true, bg: '#272822', c: '#a6e22e', d2: 201, mm: mmv('#272822', '#3e3d32', '#f8f8f2', '#a6e22e', '#f92672', '#34352d', '#272822', '#f8f8f2', '#49483e') }
  };
  // Every launch (with or without a file) starts in the Default look; theme choices last for the session only
  let pvTheme = 'bsw';
  const effDark = () => THEMES[pvTheme].dark;

  // Diagram colour palettes: node colours are cycled per diagram (hue list), tuned separately for light and dark backgrounds
  const PALETTES = {
    theme:   { name: 'Match theme', swatch: ['#6366f1'] },
    srini:   { name: 'Default', colors: ['#0a7fb0', '#f29a3a', '#8a6397', '#3f9f90', '#d5647a', '#fbb423', '#003da6', '#156250'], d2: 0 },
    srinidark: { name: 'Default Dark', colors: ['#fbb423', '#4aa8d8', '#f29a3a', '#b58ac4', '#5fc0ae', '#e0788f', '#6f8fe0', '#58a98c'], d2: 200 },
    vibrant: { name: 'Vibrant', h: [262, 199, 152, 38, 340, 12, 180, 285], s: 78, ll: 52, ld: 38, d2: 5 },
    pastel:  { name: 'Pastel', h: [215, 340, 150, 45, 280, 15, 185, 100], s: 70, ll: 88, ld: 30, d2: 102 },
    ocean:   { name: 'Ocean', h: [200, 185, 215, 170, 230, 195], s: 70, ll: 46, ld: 32, d2: 4 },
    sunset:  { name: 'Sunset', h: [8, 28, 45, 330, 350, 18], s: 82, ll: 54, ld: 38, d2: 101 },
    forest:  { name: 'Forest', h: [140, 95, 165, 70, 120, 185], s: 55, ll: 40, ld: 30, d2: 104 }
  };
  PALETTES.theme.swatch = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];
  for (const p of Object.values(PALETTES)) if (p.colors) p.swatch = p.colors.slice(0, 4);
  for (const p of Object.values(PALETTES)) if (p.h) p.swatch = p.h.slice(0, 4).map(h => `hsl(${h} ${p.s}% ${Math.min(p.ll, 60)}%)`);
  let palette = 'theme';
  // 'Match theme' on the Srini theme uses the Srini brand colours
  const ap = () => palette !== 'theme' ? palette : pvTheme === 'bsw' ? 'srini' : pvTheme === 'bswdark' ? 'srinidark' : 'theme';
  function hexToHsl(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return [230, 60];
    const [r, g, b] = [0, 2, 4].map(k => parseInt(m[1].substr(k, 2), 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
    let h = 0;
    if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, d ? d / (1 - Math.abs(2 * l - 1)) * 100 : 0];
  }
  function paletteColor(i, dark) {
    const p = PALETTES[ap()];
    if (p.colors) {
      const hex = p.colors[i % p.colors.length], [r, g, b] = [1, 3, 5].map(k => parseInt(hex.substr(k, 2), 16));
      const bright = (r * 299 + g * 587 + b * 114) / 1000 > 150;
      return { fill: hex, stroke: hex, text: bright ? '#1f2937' : '#ffffff', soft: `rgb(${r} ${g} ${b} / .14)` };
    }
    const h = p.h[i % p.h.length], l = dark ? p.ld : p.ll;
    const light = !dark && l > 70;
    return { fill: `hsl(${h} ${p.s}% ${l}%)`, stroke: `hsl(${h} ${p.s}% ${dark ? 62 : (light ? 55 : 32)}%)`, text: dark || !light && l < 60 ? '#ffffff' : '#1f2937', soft: `hsl(${h} ${p.s}% ${l}% / .14)` };
  }
  // Paints D2 shapes with the active palette, like the Mermaid and Graphviz diagrams (containers get a soft tint)
  function colorizeD2(svg, dark) {
    const t = document.createElement('template');
    t.innerHTML = svg;
    const root = t.content.querySelector('svg.d2-svg') || t.content.querySelector('svg');
    if (!root) return svg;
    const ids = [...root.children].filter(g => g.tagName === 'g' && g.querySelector(':scope > g.shape')).map(g => {
      let key = g.getAttribute('class') || '';
      try { key = atob(key.trim().split(/\s+/)[0]); } catch (e) { /* not an id */ }
      return { g, key };
    });
    let i = 0;
    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
    holder.appendChild(root.cloneNode(true));
    document.body.appendChild(holder);
    const probe = holder.firstChild;
    const outside = (g, text) => {
      try {
        const live = [...probe.children].find(n => n.getAttribute('class') === g.getAttribute('class'));
        const sb = live.querySelector(':scope > g.shape').getBBox(), tb = [...live.querySelectorAll(':scope > text')][[...g.querySelectorAll(':scope > text')].indexOf(text)].getBBox();
        const cy = tb.y + tb.height / 2;
        return cy < sb.y || cy > sb.y + sb.height;
      } catch (e) { return false; }
    };
    ids.forEach(({ g, key }) => {
      const container = ids.some(o => o.key.startsWith(key + '.'));
      const c = paletteColor(container ? ids.indexOf(ids.find(o => o.g === g)) : i++, dark);
      g.querySelectorAll(':scope > g.shape path, :scope > g.shape rect, :scope > g.shape ellipse, :scope > g.shape polygon').forEach(el => {
        el.style.setProperty('fill', container ? c.soft : c.fill, 'important');
        el.style.setProperty('stroke', c.stroke, 'important');
      });
      // Labels that sit outside their shape (person, page captions) keep D2's own text colour
      if (!container) g.querySelectorAll(':scope > text').forEach(x => { if (!outside(g, x)) x.style.setProperty('fill', c.text, 'important'); });
    });
    holder.remove();
    const edge = dark ? '#94a3b8' : '#64748b';
    root.querySelectorAll('[class~="connection"]').forEach(el => {
      el.style.setProperty('stroke', edge, 'important');
      if (el.getAttribute('fill') !== 'none') el.style.setProperty('fill', edge, 'important');
    });
    return t.innerHTML;
  }
  // Recolours the nodes of a rendered Mermaid/Graphviz SVG (D2 is handled through its own theme ids)
  function colorize(svg, kind, dark) {
    if (kind === 'd2') return ap() === 'theme' ? svg : colorizeD2(svg, dark);
    if (ap() === 'theme' && kind !== 'dot') return svg;
    const t = document.createElement('template');
    t.innerHTML = svg;
    const root = t.content.querySelector('svg');
    if (!root) return svg;
    const paint = (el, c) => {
      if (el.closest('foreignObject')) return;
      // Mermaid's neo look draws a second, unfilled outline path; recolour only its stroke so it matches the node
      if (kind !== 'dot' && el.getAttribute('fill') === 'none') { el.style.setProperty('stroke', c.stroke, 'important'); return; }
      el.style.setProperty('fill', c.fill, 'important');
      el.style.setProperty('stroke', c.stroke, 'important');
    };
    const text = (g, c) => g.querySelectorAll('text, tspan').forEach(x => x.style.setProperty('fill', c.text, 'important'));
    const html = (g, c) => g.querySelectorAll('.nodeLabel, .label, .label p, span, p').forEach(x => x.style.setProperty('color', c.text, 'important'));
    const shapes = 'rect, polygon, circle, ellipse, path';
    if (kind === 'dot') {
      // Graphviz ships a white page and black ink: make it transparent and readable on the current theme
      let ink = dark ? '#e2e8f0' : '#1e293b', edge = dark ? '#94a3b8' : '#64748b', nodeFill = null, nodeStroke = null;
      if (ap() === 'theme') {
        const mm = THEMES[pvTheme].mm || (dark ? { primaryColor: '#312e81', primaryTextColor: '#e0e7ff', primaryBorderColor: '#818cf8', lineColor: '#a5b4fc' } : { primaryColor: '#eef2ff', primaryTextColor: '#1e1b4b', primaryBorderColor: '#6366f1', lineColor: '#6366f1' });
        ink = mm.primaryTextColor; edge = mm.lineColor; nodeFill = mm.primaryColor; nodeStroke = mm.primaryBorderColor;
      }
      root.querySelectorAll('text').forEach(el => el.setAttribute('font-family', 'Helvetica, Arial, sans-serif'));
      root.querySelectorAll('g.graph > polygon').forEach(el => el.setAttribute('fill', 'transparent'));
      root.querySelectorAll('g.edge path').forEach(el => el.setAttribute('stroke', edge));
      root.querySelectorAll('g.edge polygon').forEach(el => { el.setAttribute('stroke', edge); el.setAttribute('fill', edge); });
      root.querySelectorAll('g.edge text, g.cluster text').forEach(el => el.setAttribute('fill', ink));
      root.querySelectorAll('g.node').forEach(g => {
        g.querySelectorAll('text').forEach(el => el.setAttribute('fill', ink));
        g.querySelectorAll('ellipse, polygon, path').forEach(el => { el.setAttribute('stroke', nodeStroke || edge); if (nodeFill) { el.setAttribute('fill', nodeFill); return; } if (el.getAttribute('fill') === 'none' || el.getAttribute('fill') === 'white') el.setAttribute('fill', 'transparent'); });
      });
    }
    if (ap() === 'theme') return t.innerHTML;
    root.querySelectorAll('g.node').forEach((g, i) => {
      const c = paletteColor(i, dark);
      g.querySelectorAll(shapes).forEach(el => { if (!el.closest('.label, .edgeLabel, marker')) paint(el, c); });
      text(g, c); html(g, c);
    });
    root.querySelectorAll('g.cluster').forEach((g, i) => {
      const c = paletteColor(i, dark);
      g.querySelectorAll('rect, polygon, path').forEach(el => { el.style.setProperty('fill', c.soft, 'important'); el.style.setProperty('stroke', c.stroke, 'important'); });
    });
    // Each actor is drawn twice (top and bottom box), so colour by position within one row to keep both identical
    const actorRects = root.querySelectorAll('rect.actor'), actorN = Math.max(1, Math.round(actorRects.length / 2));
    actorRects.forEach((r, i) => paint(r, paletteColor(i % actorN, dark)));
    root.querySelectorAll('text.actor').forEach((x, i) => [x, ...x.querySelectorAll('tspan')].forEach(n => n.style.setProperty('fill', paletteColor(i % actorN, dark).text, 'important')));
    return t.innerHTML;
  }

  // Heavy engines load on first use so the editor appears quickly (important on slower machines)
  const loaded = {};
  const loadLib = src => loaded[src] = loaded[src] || new Promise((ok, no) => { const t = document.createElement('script'); t.src = src; t.onload = ok; t.onerror = () => { delete loaded[src]; no(new Error('Failed to load ' + src)); }; document.head.appendChild(t); });
  function mermaidInit(dark) {
    const eff = effDark(dark);
    if (!mermaidInit.elk && window.mermaidElkLayouts) { mermaid.registerLayoutLoaders(window.mermaidElkLayouts); mermaidInit.elk = true; }
    const v = THEMES[pvTheme].mm ? THEMES[pvTheme].mm : eff ? {
      background: '#141a2e', primaryColor: '#312e81', primaryTextColor: '#e0e7ff', primaryBorderColor: '#818cf8',
      lineColor: '#a5b4fc', secondaryColor: '#4c1d95', tertiaryColor: '#1e293b', textColor: '#e2e8f0', noteBkgColor: '#1e293b'
    } : {
      primaryColor: '#eef2ff', primaryTextColor: '#1e1b4b', primaryBorderColor: '#6366f1',
      lineColor: '#6366f1', secondaryColor: '#f5f3ff', tertiaryColor: '#ffffff', textColor: '#1e293b', noteBkgColor: '#fef9c3'
    };
    // Derive the diagram-specific colours (notes, clusters, actors, labels) so they stay legible in every theme
    const full = {
      ...v,
      mainBkg: v.primaryColor, nodeBorder: v.primaryBorderColor, nodeTextColor: v.primaryTextColor,
      clusterBkg: v.secondaryColor, clusterBorder: v.primaryBorderColor, titleColor: v.textColor,
      edgeLabelBackground: eff ? v.secondaryColor : v.tertiaryColor,
      noteTextColor: eff ? v.textColor : v.primaryTextColor, noteBorderColor: v.primaryBorderColor,
      actorBkg: v.primaryColor, actorBorder: v.primaryBorderColor, actorTextColor: v.primaryTextColor, actorLineColor: v.lineColor,
      signalColor: v.lineColor, signalTextColor: v.textColor, labelBoxBkgColor: v.secondaryColor, labelBoxBorderColor: v.primaryBorderColor,
      labelTextColor: v.textColor, loopTextColor: v.textColor, sequenceNumberColor: v.primaryTextColor,
      classText: v.primaryTextColor, altBackground: v.secondaryColor
    };
    if (ap() !== 'theme') {
      for (let i = 0; i < 12; i++) { const c = paletteColor(i, eff); full['cScale' + i] = c.fill; full['cScaleLabel' + i] = c.text; full['pie' + (i + 1)] = c.fill; }
      full.pieStrokeColor = eff ? '#141a2e' : '#ffffff';
    } else {
      // Mermaid derives its section colours by darkening/lightening the primary colour, which turns near-black in dark themes
      const [h0, s0] = hexToHsl(v.primaryBorderColor);
      for (let i = 0; i < 12; i++) {
        const h = (h0 + i * 30) % 360, sat = Math.max(40, Math.min(75, s0)), l = eff ? 38 : 82;
        full['cScale' + i] = `hsl(${h} ${sat}% ${l}%)`;
        full['cScaleInv' + i] = `hsl(${h} ${sat}% ${eff ? 62 : 45}%)`;
        full['cScalePeer' + i] = `hsl(${h} ${sat}% ${eff ? 62 : 45}%)`;
        full['cScaleLabel' + i] = eff ? '#ffffff' : '#1f2937';
      }
    }
    {
      // Gantt colours are not derived sensibly from the base theme (white or grey bars, harsh grid), so define them explicitly
      const [h, sat0] = hexToHsl(v.primaryBorderColor), sat = Math.max(40, Math.min(75, sat0));
      Object.assign(full, {
        taskBkgColor: `hsl(${h} ${sat}% ${eff ? 38 : 82}%)`, taskBorderColor: v.primaryBorderColor,
        activeTaskBkgColor: `hsl(${h} ${sat}% ${eff ? 52 : 64}%)`, activeTaskBorderColor: v.primaryBorderColor,
        doneTaskBkgColor: eff ? '#475569' : '#e2e8f0', doneTaskBorderColor: eff ? '#94a3b8' : '#94a3b8',
        critBkgColor: eff ? '#b91c1c' : '#fecaca', critBorderColor: '#ef4444',
        taskTextColor: eff ? '#ffffff' : '#1f2937', taskTextLightColor: '#ffffff', taskTextDarkColor: eff ? '#ffffff' : '#1f2937', taskTextOutsideColor: v.textColor,
        gridColor: eff ? '#3b4658' : '#d1d5db', todayLineColor: '#ef4444',
        sectionBkgColor: eff ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.03)', altSectionBkgColor: 'rgba(0,0,0,0)',
        sectionBkgColor2: eff ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)', excludeBkgColor: eff ? '#334155' : '#e5e7eb'
      });
    }
    mermaidInit.border = v.primaryBorderColor;
    mermaid.initialize({
      layout: mermaidInit.elk ? 'elk' : 'dagre',
      startOnLoad: false, securityLevel: 'strict', look: eff ? 'classic' : 'neo', theme: 'base',
      fontFamily: 'Inter, system-ui, sans-serif',
      themeVariables: full,
      flowchart: { curve: 'basis', htmlLabels: true, padding: 14 },
      gantt: { useWidth: 800, leftPadding: 90, rightPadding: 40, fontSize: 13, axisFormat: '%b %d' }
    });
  }

  // Initialize Mermaid safely
  if (window.mermaid) {
    mermaidInit(false);
  } else {
    statusBadge.style.display = 'inline-block';
    statusBadge.textContent = 'Warning: Mermaid CDN did not load (check internet/firewall)';
  }

  // Configure Marked
  if (window.marked) {
    const renderer = new marked.Renderer();
    const originalCode = renderer.code.bind(renderer);
    renderer.code = function(code, infostring, escaped) {
      const text = typeof code === 'object' ? code.text : code;
      const lang = typeof code === 'object' ? code.lang : infostring;
      if ((lang || '').trim().toLowerCase() === 'mermaid') {
        const encoded = encodeURIComponent(text.trim());
        return `<div class="mermaid-container" data-mermaid="${encoded}">Rendering diagram...</div>`;
      }
      const l = (lang || '').trim().toLowerCase();
      if (l === 'd2' || l === 'dot' || l === 'graphviz') {
        const kind = l === 'd2' ? 'd2' : 'dot';
        return `<div class="mermaid-container" data-kind="${kind}" data-mermaid="${encodeURIComponent(text.trim())}">Rendering diagram...</div>`;
      }
      const hl = window.hljs && !(l === 'd2' || l === 'dot' || l === 'graphviz') && text.trim() ? (() => {
        try { return l && hljs.getLanguage(l) ? hljs.highlight(text, { language: l, ignoreIllegals: true }).value : null; } catch { return null; }
      })() : null;
      if (hl !== null) return `<pre><code class="hljs language-${l}">${hl}</code></pre>`;
      return originalCode(code, infostring, escaped);
    };
    marked.setOptions({ renderer, gfm: true, breaks: true });
    marked.use({ extensions: [
      { name: 'mathBlock', level: 'block', start: src => src.indexOf('$$'),
        tokenizer(src) { const m = /^\$\$\n?([\s\S]+?)\n?\$\$[ \t]*(?:\n|$)/.exec(src); if (m) return { type: 'mathBlock', raw: m[0], text: m[1].trim() }; },
        renderer: t => `<div class="math-block" data-tex="${encodeURIComponent(t.text)}"></div>\n` },
      { name: 'mathInline', level: 'inline', start: src => { const i = src.indexOf('$'); return i < 0 ? undefined : i; },
        tokenizer(src) { const m = /^\$(?!\s)((?:\\.|[^$\\\n])+?)(?<!\s)\$(?!\d)/.exec(src); if (m) return { type: 'mathInline', raw: m[0], text: m[1] }; },
        renderer: t => `<span class="math-inline" data-tex="${encodeURIComponent(t.text)}"></span>` }
    ] });
  }

  function enhanceDiagram(c) {
    const svg = c.querySelector('svg');
    if (!svg) return;
    svg.style.maxWidth = '100%'; svg.style.height = 'auto';
    // Mermaid emits width="100%"; inside a shrink-to-fit stage that collapses to 300px, so pin it to the natural size
    const vb = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    if (!/^[\d.]+(px|pt)?$/.test(svg.getAttribute('width') || '') && vb.length === 4 && vb[2] > 0) svg.style.width = vb[2] + 'px';
    const stage = document.createElement('div');
    stage.className = 'dg-stage';
    stage.appendChild(svg);
    c.innerHTML = '';
    c.appendChild(stage);
    const bar = document.createElement('div');
    bar.className = 'dg-tools';
    const I = (d) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    const ICON = {
      zi: I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>'),
      zo: I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/>'),
      rs: I('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
      dl: I('<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>'),
      mx: I('<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>'),
      cl: I('<path d="M6 6l12 12M18 6L6 18"/>')
    };
    bar.innerHTML = `<button title="Zoom in">${ICON.zi}</button><button title="Zoom out">${ICON.zo}</button><button title="Reset">${ICON.rs}</button><button title="Download SVG">${ICON.dl}</button><button title="Maximize (Esc to exit)">${ICON.mx}</button>`;
    c.appendChild(bar);
    let k = 1, x = 0, y = 0;
    const apply = () => { stage.style.transform = `translate(${x}px,${y}px) scale(${k})`; };
    const [zi, zo, rs, dl, mx] = bar.querySelectorAll('button');
    zi.onclick = () => { k = Math.min(k * 1.25, 8); apply(); };
    zo.onclick = () => { k = Math.max(k / 1.25, 0.3); apply(); };
    rs.onclick = () => { k = 1; x = y = 0; apply(); };
    dl.onclick = () => {
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'diagram.svg'; a.click();
      URL.revokeObjectURL(a.href);
    };
    const toggleMax = (on) => {
      const max = on === undefined ? !c.classList.contains('maximized') : on;
      c.classList.toggle('maximized', max);
      document.body.classList.toggle('has-max', max);
      mx.innerHTML = max ? ICON.cl : ICON.mx;
      k = 1; x = y = 0; apply();
    };
    mx.onclick = () => toggleMax();
    c.addEventListener('dblclick', (e) => { if (!e.target.closest('.dg-tools')) toggleMax(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && c.classList.contains('maximized')) toggleMax(false); });
    c.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      k = Math.min(8, Math.max(0.3, k * (e.deltaY < 0 ? 1.1 : 0.9))); apply();
    }, { passive: false });
    let drag = null;
    c.addEventListener('mousedown', (e) => { if (e.target.closest('.dg-tools')) return; drag = { sx: e.clientX - x, sy: e.clientY - y }; c.classList.add('grabbing'); });
    window.addEventListener('mousemove', (e) => { if (!drag) return; x = e.clientX - drag.sx; y = e.clientY - drag.sy; apply(); });
    window.addEventListener('mouseup', () => { drag = null; c.classList.remove('grabbing'); });
  }

  let d2Engine = null, vizEngine = null;
  // The D2 worker handles one request at a time; overlapping renders corrupt each other's results
  let d2Lock = Promise.resolve();
  function renderD2(code, dark) {
    const run = d2Lock.then(() => renderD2Now(code, dark));
    d2Lock = run.catch(() => {});
    return run;
  }
  async function renderD2Now(code, dark) {
    await loadLib('lib/d2.js');
    if (!window.D2) throw new Error('D2 library not loaded');
    d2Engine = d2Engine || new window.D2();
    const themeID = (ap() !== 'theme' && !effDark(dark) ? PALETTES[ap()].d2 : null) ?? THEMES[pvTheme].d2 ?? (effDark(dark) ? 200 : 0);
    // Tint D2's blue/neutral ramps with the theme accent so the diagram matches the app (palettes with their own D2 theme keep it)
    if (ap() === 'theme' && !/d2-config/.test(code)) {
      const t = THEMES[pvTheme], dk = effDark(dark), [h, sat] = hexToHsl(t.c);
      const hx = (hh, ss, l) => { ss /= 100; l /= 100; const k = n => (n + hh / 30) % 12, aa = ss * Math.min(l, 1 - l), f = n => Math.round(255 * (l - aa * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))).toString(16).padStart(2, '0'); return '#' + f(0) + f(8) + f(4); };
      const ls = dk ? [78, 70, 60, 48, 36, 28] : [30, 46, 72, 91, 95, 98];
      const ns = dk ? [92, 80, 62, 40, 24, 17, 12] : [16, 32, 52, 76, 88, 95, 99];
      const B = ls.map((l, i) => hx(h, Math.min(sat, i < 2 ? 75 : dk ? 45 : 85), l));
      // D2 also colours cylinders, pages and other shapes from its AA/AB ramps; point them at the same hue
      let lines;
      const mmFor = t.mm || (dk ? { background: '#141a2e', primaryColor: '#312e81', primaryTextColor: '#e0e7ff', primaryBorderColor: '#818cf8', textColor: '#e2e8f0', secondaryColor: '#4c1d95' } : { primaryColor: '#eef2ff', primaryTextColor: '#1e1b4b', primaryBorderColor: '#6366f1', textColor: '#1e293b', secondaryColor: '#f5f3ff' });
      if (mmFor) {
        // Build the ramps from the same colours the Mermaid diagrams use so both engines look identical
        const m = mmFor, bgc = m.background || (dk ? t.bg : '#ffffff');
        const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
        const mix = (a, b, w) => { const x = rgb(a), y = rgb(b); return '#' + x.map((v, i) => Math.round(v * (1 - w) + y[i] * w).toString(16).padStart(2, '0')).join(''); };
        // B4 fills containers, B5 nested shapes; keep containers a quiet tint so shapes stand out like in Mermaid subgraphs
        const Bm = [m.primaryBorderColor, mix(m.primaryBorderColor, m.primaryColor, .4), mix(m.primaryBorderColor, m.primaryColor, .7), mix(bgc, m.primaryColor, dk ? .4 : .5), m.primaryColor, mix(m.primaryColor, bgc, .4)];
        const Nm = [m.primaryTextColor, m.textColor, mix(m.textColor, bgc, .35), mix(m.textColor, bgc, .6), mix(m.textColor, bgc, .8), mix(m.secondaryColor, bgc, .5), bgc];
        lines = [...Bm.map((c, i) => `B${i + 1}: "${c}"`), ...Nm.map((c, i) => `N${i + 1}: "${c}"`), `AA2: "${Bm[1]}"`, `AA4: "${Bm[4]}"`, `AA5: "${Bm[4]}"`, `AB4: "${Bm[4]}"`, `AB5: "${Bm[4]}"`];
      } else lines = [...B.map((c, i) => `B${i + 1}: "${c}"`), ...ns.map((l, i) => `N${i + 1}: "${hx(h, 8, l)}"`), `AA2: "${B[1]}"`, `AA4: "${B[3]}"`, `AA5: "${B[4]}"`, `AB4: "${B[3]}"`, `AB5: "${B[4]}"`];
      code = `vars: {\n  d2-config: {\n    theme-overrides: {\n${lines.map(l => '      ' + l).join('\n')}\n    }\n  }\n}\n` + code;
    }
    let r, svg;
    try {
      r = await d2Engine.compile(code, { layout: 'elk', themeID, sketch: false });
      svg = await d2Engine.render(r.diagram, { ...r.renderOptions, themeID, pad: 20 });
    } catch (e) {
      if (/unsafe-eval|Content Security Policy/i.test(String(e && e.message))) throw new Error(`D2 was blocked by a security policy. Page: ${location.href.slice(0, 80)} | sandbox shim: ${window.__d2Shim ? 'on' : 'off'} | build: sandbox-v1`);
      throw e;
    }
    // Use the app's UI font instead of D2's embedded serif-looking face
    svg = svg.replace(/<\/svg>\s*$/, `<style>.d2-svg text:not(.text-mono){font-family:'Inter',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif !important}.d2-svg text.text-bold{font-weight:600}.d2-svg text.text-italic{font-style:italic}</style></svg>`);
    // Drop the opaque page rectangle so dark themes keep their own background
    svg = svg.replace(/(<svg class="[^"]*d2-svg[^>]*>)\s*<rect[^>]*fill-N7[^>]*stroke-width="0"[^>]*?(?:\/>|><\/rect>)/, '$1');
    // D2 omits width/height on the root <svg>, which collapses it to 0x0 inside the diagram card
    return svg.replace(/<svg\b([^>]*)>/, (m, attrs) => {
      const vb = /viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"/.exec(attrs);
      return vb && !/\swidth=/.test(attrs) ? `<svg width="${vb[1]}" height="${vb[2]}"${attrs}>` : m;
    });
  }
  async function renderDot(code) {
    await loadLib('lib/viz.js');
    if (!window.Viz) throw new Error('Graphviz library not loaded');
    vizEngine = vizEngine || await window.Viz.instance();
    return vizEngine.renderString(code, { format: 'svg' });
  }

  // Diagrams are rendered off-screen and swapped in at once, so the preview never flashes
  let currentRenderId = 0;
  const svgCache = new Map();
  let mermaidLock = Promise.resolve();

  async function getSvg(kind, code, dark, id) {
    const key = `${pvTheme}|${palette}|${effDark(dark) ? 1 : 0}|${kind}|${code}`;
    if (svgCache.has(key)) return svgCache.get(key);
    let svg;
    if (kind === 'd2') svg = await renderD2(code, dark);
    else if (kind === 'dot') svg = await renderDot(code);
    else {
      // The neo look draws gradient underlines and edge strokes that clash with theme colours on these diagram types
      const src = /^\s*(timeline|gantt)\b/i.test(code) ? `---\nconfig:\n  look: classic\n---\n${code.trim()}` : code;
      const run = mermaidLock.then(() => loadLib('lib/mermaid-elk.js')).then(() => { mermaidInit(dark); return mermaid.render(id, src); });
      mermaidLock = run.catch(() => {});
      svg = (await run).svg;
      // The neo look strokes timeline/section boxes with a gradient that fades to white; use the theme border colour instead
      if (src !== code) svg = svg.replace('</style>', `#${id} .grid .tick line{stroke:${effDark(dark) ? '#3b4658' : '#d1d5db'} !important;opacity:1}</style>`);
      if (/^\s*timeline\b/i.test(code)) svg = svg.replace('</style>', `#${id} .timeline-node line{display:none}#${id} .lineWrapper line{stroke:${effDark(dark) ? '#e2e8f0' : '#4a4a4c'} !important}</style>`);
      svg = svg.replace(/stroke:\s*url\(#[^)]*gradient\)/g, `stroke:${mermaidInit.border || '#94a3b8'}`);
    }
    svg = colorize(svg, kind, effDark(dark));
    if (svgCache.size > 200) svgCache.clear();
    svgCache.set(key, svg);
    return svg;
  }

  // Everything rendered from user Markdown is sanitized (fail closed if the sanitizer is missing)
  if (window.DOMPurify) DOMPurify.addHook('afterSanitizeAttributes', n => {
    const h = n.tagName === 'A' && n.getAttribute('href');
    if (h && !h.startsWith('#')) { n.setAttribute('target', '_blank'); n.setAttribute('rel', 'noopener noreferrer'); }
  });
  const safeHtml = h => window.DOMPurify ? DOMPurify.sanitize(h) : '';
  const safeSvg = s => window.DOMPurify ? DOMPurify.sanitize(s, { USE_PROFILES: { svg: true, svgFilters: true }, ADD_TAGS: ['foreignObject'], ADD_ATTR: ['xlink:href'] }) : '';

  // Help-guide carousel: delegated so it survives preview re-renders.
  const czGo = (cz, i) => { const t = cz.querySelector('.cz-track'); const n = t.children.length; i = (i + n) % n; cz.dataset.i = i; t.dataset.busy = '1'; t.scrollTo({ left: i * t.clientWidth }); clearTimeout(t._b); t._b = setTimeout(() => delete t.dataset.busy, 700); };
  const czIndex = t => Math.round(t.scrollLeft / Math.max(1, t.clientWidth));
  preview.addEventListener('click', e => {
    const b = e.target.closest('.cz-btn, .cz-dot'); if (!b) return;
    const cz = b.closest('.cz'); const t = cz.querySelector('.cz-track');
    if (b.classList.contains('cz-dot')) czGo(cz, [...cz.querySelectorAll('.cz-dot')].indexOf(b));
    else czGo(cz, (cz.dataset.i !== undefined ? +cz.dataset.i : czIndex(t)) + (b.classList.contains('cz-next') ? 1 : -1));
  });
  preview.addEventListener('scroll', e => {
    const t = e.target; if (!t.classList || !t.classList.contains('cz-track')) return;
    const i = czIndex(t); (t.parentElement.dataset.i === undefined || Math.abs(t.scrollLeft - t.parentElement.dataset.i * t.clientWidth) < 2 || !t.dataset.busy) && (t.parentElement.dataset.i = i); t.parentElement.querySelectorAll('.cz-dot').forEach((d, k) => d.classList.toggle('on', k === i));
  }, true);

  // Renders block by block so each block's first element records its source line (data-line) for scroll sync
  function parseWithLines(md) {
    try {
      const toks = marked.lexer(md), t = document.createElement('template');
      let line = 0, html = '';
      for (const tok of toks) {
        t.innerHTML = marked.parser(Object.assign([tok], { links: toks.links }));
        if (tok.type !== 'space') { const el = t.content.firstElementChild; if (el) el.setAttribute('data-line', line); }
        html += t.innerHTML;
        line += (tok.raw.match(/\n/g) || []).length;
      }
      return html;
    } catch { return marked.parse(md); }
  }

  async function buildPreview(md, dark, token, allowLazy = false) {
    const root = document.createElement('div');
    root.innerHTML = window.marked ? safeHtml(parseWithLines(md)) : '';
    root.querySelectorAll('.cz .cz-dot:first-child').forEach(d => d.classList.add('on'));
    if (!window.marked) root.textContent = md;
    if (window.katex) root.querySelectorAll('.math-inline,.math-block').forEach(el => {
      try { katex.render(decodeURIComponent(el.dataset.tex), el, { displayMode: el.classList.contains('math-block'), throwOnError: false, output: 'htmlAndMathml' }); }
      catch { el.textContent = decodeURIComponent(el.dataset.tex); }
    });
    const containers = Array.from(root.querySelectorAll('.mermaid-container'));
    // Only show the badge for slow renders, with static text, to avoid UI churn
    const badgeTimer = setTimeout(() => { statusBadge.textContent = 'Rendering diagrams…'; statusBadge.style.display = 'inline-block'; }, 700);
    if (allowLazy && containers.length > 2 && (resetScroll || !preview.firstElementChild)) {
      clearTimeout(badgeTimer);
      root.querySelectorAll('img').forEach(im => { im.loading = 'lazy'; im.decoding = 'async'; });
      containers.forEach(c => c.classList.add('pending'));
      loadLib('lib/mermaid-elk.js').catch(() => {});
      commit(root);
      lazyFill(containers, dark, token);
      return null;
    }
    try { return await fillDiagrams(root, containers, dark, token); } finally { clearTimeout(badgeTimer); }
  }

  async function fillOne(c, i, dark, token) {
    const code = decodeURIComponent(c.getAttribute('data-mermaid'));
    try {
      const holder = document.createElement('div');
      const kind = c.getAttribute('data-kind') || 'mermaid';
      const svgText = await getSvg(kind, code, dark, `mermaid-svg-${token}-${i}-${Date.now()}`);
      holder.innerHTML = kind === 'mermaid' ? svgText : safeSvg(svgText);
      c.replaceChildren(holder.firstElementChild);
      enhanceDiagram(c);
    } catch (err) {
      c.innerHTML = `<div class="mermaid-error">Diagram Syntax Error:\n${(err.message || err).toString().replace(/</g, '&lt;')}</div>`;
    }
  }

  async function fillDiagrams(root, containers, dark, token) {
    for (let i = 0; i < containers.length; i++) {
      if (token !== currentRenderId) return null;
      await fillOne(containers[i], i, dark, token);
      await new Promise(r => setTimeout(r, 0));
    }
    return token === currentRenderId ? root : null;
  }

  // First paint / opening a file: show the text at once and render diagrams as they approach the viewport
  let lazyObserver = null, lazyCtx = null, lazyQueue = Promise.resolve();
  function lazyFill(containers, dark, token) {
    if (lazyObserver) lazyObserver.disconnect();
    lazyCtx = { containers, dark, token };
    let queue = lazyQueue = Promise.resolve();
    lazyObserver = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const c = en.target; lazyObserver.unobserve(c);
        queue = lazyQueue = queue.then(async () => {
          if (token !== currentRenderId) return;
          await fillOne(c, containers.indexOf(c), dark, token);
          c.classList.remove('pending');
        });
      }
    }, { root: preview, rootMargin: '1600px 0px' });
    containers.forEach(c => lazyObserver.observe(c));
  }


  let resetScroll = false;
  function commit(root) {
    const top = resetScroll ? 0 : preview.scrollTop;
    resetScroll = false;
    preview.replaceChildren(...root.childNodes);
    preview.scrollTop = top;
    statusBadge.style.display = 'none';
  }

  let typingTimer = null;
  function renderAll(md, immediate = false) {
    const token = ++currentRenderId;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      const root = await buildPreview(md, document.body.classList.contains('dark'), token, true);
      if (root) commit(root);
    }, immediate ? 0 : 300);
  }

  editor.addEventListener('input', () => renderAll(editor.value, false));

  const statChars = document.getElementById('statChars');
  const statWords = document.getElementById('statWords');
  const statLines = document.getElementById('statLines');
  const plural = (n, w) => n.toLocaleString() + ' ' + w + (n === 1 ? '' : 's');
  function updateStats() {
    const t = editor.value;
    const words = (t.match(/\S+/g) || []).length;
    const lines = t ? t.split(/\r\n|\r|\n/).length : 0;
    statChars.textContent = plural(t.length, 'character');
    statWords.textContent = plural(words, 'word');
    statLines.textContent = plural(lines, 'line');
  }
  editor.addEventListener('input', updateStats);

  function loadText(text, name, handle = null) {
    fileName.textContent = name;
    editor.value = text;
    pdfBtn.disabled = false;
    pdfBtn.title = 'Export as PDF';
    resetScroll = true;
    renderAll(editor.value, true);
    fileHandle = handle;
    setDirty(false);
    sidebar.style.width = '';
    if (sidebar.classList.contains('collapsed')) setCollapsed(false);
  }

  // Save back to the opened file (File System Access API); falls back to Save As / download
  const saveBtn = document.getElementById('saveBtn');
  const mdTypes = [{ description: 'Markdown', accept: { 'text/markdown': ['.md', '.markdown', '.mdown', '.mkd'], 'text/plain': ['.txt'] } }];
  let fileHandle = null, dirty = false;
  let draftT;
  let original = null;
  const resetBtn = document.getElementById('resetBtn');
  function setDirty(d) {
    dirty = d;
    if (!d) original = editor.value;
    resetBtn.disabled = !d;
    if (!d) { clearTimeout(draftT); try { localStorage.removeItem('mdDraft'); } catch {} }
    saveBtn.disabled = !d;
    saveBtn.title = d ? 'Save changes (Ctrl/Cmd+S)' : 'No unsaved changes';
    fileName.classList.toggle('dirty', d);
  }
  editor.addEventListener('input', () => setDirty(true));
  resetBtn.addEventListener('click', () => {
    if (!dirty || original === null || !confirm('Discard all edits and restore the original content?')) return;
    editor.value = original;
    renderAll(original, true);
    setDirty(false);
  });
  // Keep a recoverable draft of unsaved edits
  editor.addEventListener('input', () => { clearTimeout(draftT); draftT = setTimeout(() => { try { localStorage.setItem('mdDraft', JSON.stringify({ text: editor.value, name: fileName.textContent })); } catch {} }, 800); });
  async function saveFile() {
    if (!dirty) return;
    try {
      if (!fileHandle && window.showSaveFilePicker) {
        const cur = fileName.textContent;
        fileHandle = await showSaveFilePicker({ suggestedName: cur && cur !== 'No file selected' ? cur : 'document.md', types: mdTypes });
        fileName.textContent = fileHandle.name;
      }
      if (fileHandle) {
        const w = await fileHandle.createWritable();
        await w.write(editor.value);
        await w.close();
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([editor.value], { type: 'text/markdown' }));
        a.download = fileName.textContent.endsWith('.md') ? fileName.textContent : 'document.md';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      setDirty(false);
    } catch (err) {
      if (err.name !== 'AbortError') alert('Could not save: ' + err.message);
    }
  }
  saveBtn.addEventListener('click', saveFile);
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveFile(); }
  });
  window.addEventListener('beforeunload', (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  // Opening through a file handle lets Save write back to the same file
  document.querySelector('label[for="fileInput"]').addEventListener('click', async (e) => {
    if (!window.showOpenFilePicker) return;
    e.preventDefault();
    try {
      const [h] = await showOpenFilePicker({ types: mdTypes });
      const f = await h.getFile();
      loadText(await f.text(), f.name, h);
    } catch (err) {
      if (err.name !== 'AbortError') fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => loadText(event.target.result, file.name);
    reader.readAsText(file);
    e.target.value = '';
  });

  // Extension mode: the background worker redirects opened .md files here as ?src=<url>
  const srcUrl = new URLSearchParams(location.search).get('src');
  if (srcUrl) {
    const name = decodeURIComponent(srcUrl.split(/[?#]/)[0].split('/').pop() || 'document.md');
    fetch(srcUrl).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(t => loadText(t, name))
      .catch(() => {
        editor.value = `# Cannot read file\n\nCould not load \`${srcUrl}\`.\n\nFor local files, open **chrome://extensions** (or **edge://extensions**), choose this extension's **Details**, and turn on **Allow access to file URLs**.`;
        renderAll(editor.value, true);
      });
  }

  // Diagrams below the fold are rendered lazily; finish them before printing
  async function renderPending() {
    if (!lazyCtx) return;
    const { containers, dark, token } = lazyCtx;
    if (lazyObserver) lazyObserver.disconnect();
    await lazyQueue;
    for (const c of containers) {
      if (token !== currentRenderId) return;
      if (c.classList.contains('pending')) { await fillOne(c, containers.indexOf(c), dark, token); c.classList.remove('pending'); }
    }
  }
  // Export PDF via the browser print dialog, keeping the current theme
  pdfBtn.addEventListener('click', async () => {
    await renderPending();
    const prevTitle = document.title;
    const base = fileName.textContent;
    if (base && base !== 'No file selected') document.title = base.replace(/\.[^.]+$/, '');
    window.addEventListener('afterprint', () => { document.title = prevTitle; }, { once: true });
    setTimeout(() => window.print(), 100);
  });

  function setThemeUI(dark) { document.body.classList.toggle('dark', dark); }
  const pvMenu = document.getElementById('pvMenu');
  const rail = document.getElementById('rail');
  const pvBtn = document.getElementById('pvBtn');

  function setExpandCursor(dark) {
    const stroke = dark ? '#c9cacd' : '#6b6c70', bg = dark ? '#303032' : '#ffffff', edge = dark ? '#6b6c70' : '#c9cacd';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><rect x='1.500' y='1.500' width='33' height='33' rx='10' fill='${bg}' stroke='${edge}' stroke-width='1.500'/><g transform='translate(6 6) scale(1)' fill='none' stroke='${stroke}' stroke-width='1.800' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='4' width='18' height='16' rx='2'/><path d='M9 4v16'/><path d='m14 10 2 2-2 2'/></g></svg>`;
    document.body.style.setProperty('--expand-cursor', `url("data:image/svg+xml,${encodeURIComponent(svg)}") 18 18, e-resize`);
  }
  function setPvUI(id) {
    setExpandCursor(THEMES[id].dark);
    document.body.dataset.pv = id;
    setThemeUI(THEMES[id].dark);
    pvMenu.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.id ? b.dataset.id === id : b.dataset.pal === palette));
  }

  // Build the preview with the new look first, then switch theme and content together
  async function applyLook({ pv = pvTheme, pal = palette } = {}) {
    const prevPv = pvTheme, prevPal = palette;
    pvTheme = pv;
    palette = pal;
    const token = ++currentRenderId;
    clearTimeout(typingTimer);
    const root = await buildPreview(editor.value, THEMES[pv].dark, token);
    if (!root) { if (token === currentRenderId) { pvTheme = prevPv; palette = prevPal; } return; }
    document.body.classList.add('no-anim');
    setPvUI(pv);
    commit(root);
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('no-anim')));
  }

  pvMenu.innerHTML = '<div class="pv-title">Theme</div>' + Object.entries(THEMES).map(([id, t]) =>
    `<button type="button" role="menuitem" data-id="${id}"><span class="sw" style="background:${t.bg};--c:${t.c}"></span>${t.name}<span class="tick">✓</span></button>`).join('') +
    '<div class="pv-title pv-sep">Diagram colors</div>' + Object.entries(PALETTES).map(([id, p]) =>
    `<button type="button" role="menuitem" data-pal="${id}"><span class="strip">${p.swatch.map(c => `<i style="background:${c}"></i>`).join('')}</span>${p.name}<span class="tick">✓</span></button>`).join('');
  function closePv() { pvMenu.classList.remove('open'); rail.classList.remove('menu-open'); }
  pvBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !pvMenu.classList.contains('open');
    pvMenu.style.top = rail.classList.contains('inline') ? '' : Math.max(8, pvBtn.offsetTop - 8) + 'px';
    pvMenu.classList.toggle('open', open);
    rail.classList.toggle('menu-open', open);
  });
  pvMenu.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-id], button[data-pal]');
    if (!b) return;
    closePv();
    applyLook(b.dataset.pal ? { pal: b.dataset.pal } : { pv: b.dataset.id, pal: 'theme' });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('#pvMenu')) closePv(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePv(); });

  // Collapse / Expand Sidebar
  function setCollapsed(c) {
    sidebar.classList.toggle('collapsed', c);
    resizer.classList.toggle('collapsed', c);
    if (c) document.body.insertBefore(rail, sidebar); else sidebar.querySelector('.sidebar-header').appendChild(rail);
    rail.classList.toggle('inline', !c);
    toggleBtn.innerHTML = c ? ICONS.panelShow : ICONS.panelHide;
    toggleBtn.title = toggleBtn.ariaLabel = c ? 'Show source pane' : 'Hide source pane';
  }
  setCollapsed(false);
  toggleBtn.addEventListener('click', () => setCollapsed(!sidebar.classList.contains('collapsed')));
  // With the source hidden, clicking anywhere on the rail (not on a button or menu) restores it
  // ...and dragging it to the right pulls the source pane back out, then resizes it like the divider
  // composedPath survives the icon being swapped out of the DOM mid-click
  const onControl = (e) => e.composedPath().some(n => n.matches && n.matches('button, label, #pvMenu'));
  let railPress = null, suppressRailClick = false;
  document.getElementById('rail').addEventListener('mousedown', (e) => {
    if (e.button !== 0 || !sidebar.classList.contains('collapsed') || onControl(e)) return;
    railPress = { x: e.clientX };
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (!railPress || Math.abs(e.clientX - railPress.x) < 5) return;
    railPress = null;
    suppressRailClick = true;
    setCollapsed(false);
    isDragging = true;
    resizer.classList.add('dragging');
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mouseup', () => { railPress = null; });
  document.getElementById('rail').addEventListener('click', (e) => {
    if (suppressRailClick) { suppressRailClick = false; return; }
    if (sidebar.classList.contains('collapsed') && !onControl(e)) setCollapsed(false);
  });


  // Copy the Markdown source
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', async () => {
    const text = editor.value;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } finally { ta.remove(); }
    }
    const old = copyBtn.innerHTML;
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    copyBtn.title = 'Copied!'; copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.innerHTML = old; copyBtn.title = 'Copy Markdown'; copyBtn.classList.remove('copied'); }, 1300);
  });

  // Proportional scroll sync between the editor and the preview
  const syncBtn = document.getElementById('syncBtn');
  document.getElementById('helpBtn').addEventListener('click', () => {
    if (!window.WELCOME_MD) return;
    if (dirty && !confirm('Open the Help guide? Your unsaved edits will be replaced.')) return;
    loadText(window.WELCOME_MD, 'Help.md');
  });
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (editor.value && !confirm('Clear all contents? This cannot be undone.')) return;
    loadText('', 'Untitled.md');
  });
  const editorScroller = ed.view.scrollDOM, previewScroller = document.getElementById('preview');
  let syncOn = localStorage.getItem('mdSync') !== '0', syncSource = null, syncTimer;
  const paintSync = () => { syncBtn.setAttribute('aria-pressed', String(syncOn)); syncBtn.title = 'Sync scroll: ' + (syncOn ? 'on' : 'off'); };
  paintSync();
  syncBtn.addEventListener('click', () => { syncOn = !syncOn; localStorage.setItem('mdSync', syncOn ? '1' : '0'); paintSync(); });
  // Pairs of matching scroll offsets [editor, preview], anchored on each block's source line
  const syncPoints = () => {
    const view = ed.view, doc = view.state.doc;
    const maxE = editorScroller.scrollHeight - editorScroller.clientHeight, maxP = previewScroller.scrollHeight - previewScroller.clientHeight;
    const pTop = previewScroller.getBoundingClientRect().top - previewScroller.scrollTop;
    const pts = [[0, 0]];
    previewScroller.querySelectorAll('[data-line]').forEach(el => {
      const e = view.lineBlockAt(doc.line(Math.min(+el.dataset.line + 1, doc.lines)).from).top;
      const p = el.getBoundingClientRect().top - pTop;
      const last = pts[pts.length - 1];
      if (e > last[0] && p > last[1] && e < maxE && p < maxP) pts.push([e, p]);
    });
    pts.push([Math.max(maxE, 1), Math.max(maxP, 1)]);
    return pts;
  };
  const mapScroll = (x, pts, i0, i1) => {
    let k = 1;
    while (k < pts.length - 1 && pts[k][i0] <= x) k++;
    const a = pts[k - 1], b = pts[k];
    return a[i1] + (Math.min(x, b[i0]) - a[i0]) / Math.max(1, b[i0] - a[i0]) * (b[i1] - a[i1]);
  };
  const linkScroll = (from, to) => from.addEventListener('scroll', () => {
    if (!syncOn || (syncSource && syncSource !== from)) return;
    syncSource = from;
    const pts = syncPoints(), fromEd = from === editorScroller;
    to.scrollTop = mapScroll(from.scrollTop, pts, fromEd ? 0 : 1, fromEd ? 1 : 0);
    clearTimeout(syncTimer); syncTimer = setTimeout(() => { syncSource = null; }, 80);
  }, { passive: true });
  linkScroll(editorScroller, previewScroller);
  linkScroll(previewScroller, editorScroller);

  // Scroll-to-top button appears once the preview is scrolled down
  const toTop = document.getElementById('toTop');
  const previewEl = document.getElementById('preview');
  previewEl.addEventListener('scroll', () => toTop.classList.toggle('show', previewEl.scrollTop > 300), { passive: true });
  toTop.addEventListener('click', () => previewEl.scrollTo({ top: 0, behavior: 'smooth' }));

  // Draggable Divider
  let isDragging = false;
  resizer.addEventListener('mousedown', (e) => {
    if (e.target.closest('#toggleBtn') || resizer.classList.contains('collapsed')) return;
    isDragging = true;
    resizer.classList.add('dragging');
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // Dragging the divider all the way to the left collapses the source pane
    if (e.clientX < 120) {
      isDragging = false;
      resizer.classList.remove('dragging');
      document.body.style.userSelect = '';
      sidebar.style.width = '';
      setCollapsed(true);
      return;
    }
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 15 && newWidth < 80) {
      sidebar.style.width = newWidth + '%';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    resizer.classList.remove('dragging');
    document.body.style.userSelect = '';
  });

  // Load a sample diagram on startup so you can verify immediately
  const sample = window.WELCOME_MD || `# Diagram Test\n\n\`\`\`mermaid\ngraph LR\n    A[Open .md File] --> B[Parse Markdown]\n    B --> C[Render SVG Diagram]\n\`\`\``;
  if (/```d2/.test(sample)) setTimeout(() => { d2Lock = d2Lock.then(() => loadLib('lib/d2.js')).then(() => { d2Engine = d2Engine || new window.D2(); return d2Engine.compile('a -> b'); }).catch(() => {}); }, 1500);
  let boot = sample, recovered = false;
  try { const d = JSON.parse(localStorage.getItem('mdDraft') || 'null'); if (d && d.text && d.text !== sample) { boot = d.text; recovered = true; fileName.textContent = d.name || 'Recovered draft'; } } catch {}
  if (!srcUrl) editor.value = boot;
  original = srcUrl ? null : boot;
  setPvUI(pvTheme);
  if (!srcUrl) { renderAll(boot, true); if (recovered) { setDirty(true); original = sample; pdfBtn.disabled = false; } }
