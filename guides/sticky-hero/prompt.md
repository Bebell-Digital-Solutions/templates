# Prompt: Sticky stack with receding card

**Goal.** Add a "sticky stack" section to the page: two or more full-viewport panels stacked vertically, where each pinned panel stays fixed at the top of the viewport while the next one slides up and covers it — and as the covered panel is overtaken, it shrinks slightly and darkens so it reads as receding *into* the page rather than just being covered. The last panel is a normal block, so page flow resumes underneath it.

### Required behavior

- **Each panel except the last is sticky** at `top: 0`, `height: 100vh` (use `100lvh` if the design supports it), with an **increasing `z-index`** per panel (`0`, `10`, `20`, …). The last panel is `position: relative` with the highest `z-index`, so it's the only one that ever moves with scroll after the stack ends.
- **The covered panel recedes**:
  - its **inner content** (see below) scales from `1` toward `0.9`
  - a full-bleed **shade overlay** fades from `opacity: 0` toward `0.55`
  - both are **scroll-linked and reversible** — they're a pure function of scroll position, not a one-shot animation, not a spring, not a library.
- **Progress** for panel `i` is computed from the *next* panel's bounding box:
  ```
  p = clamp01(1 - nextPanel.getBoundingClientRect().top / viewportHeight)
  ```
  - `p = 0` → next panel is one full viewport away, nothing covered yet
  - `p = 1` → next panel has fully covered the current one
- **Scale and shade target values must be named constants** at the top of the JS (`RECEDE_SCALE = 0.9`, `RECEDE_SHADE = 0.55`) so they can be tuned.
- **Phones get shade only** (`scale` disabled below ~640px width). A full-width card shrinking to `0.9` reads as a layout bug on a narrow screen.
- **When `p >= 1`, set `visibility: hidden`** on the covered panel's inner wrapper. This is important if any covered section hosts a canvas, video, or animation loop — it stops the browser from painting it.
- **Coalesce the scroll handler into one `requestAnimationFrame`.** Multiple `getBoundingClientRect()` calls per scroll event will jank.
- **Also call `apply()` on `resize`** (cheap, and prevents stale transforms after orientation changes).

### Structural constraints — do not violate

1. **`position: sticky` goes on the section/panel element itself.** Do not put it on a wrapper. Do not use `position: fixed` with spacers as a substitute.
2. **`transform: scale()` goes on an inner wrapper, never on the sticky element.** A transformed element becomes the containing block for `position: fixed` descendants — putting the scale on the sticky element will break any fixed-position loader, modal, or toast that lives inside that section. Keep the sticky element itself un-transformed.
3. **Clear the transform when `p === 0`** (`inner.style.transform = ""`, not `scale(1)`). A permanently-transformed ancestor has the same `position: fixed` side-effect as above, and it will silently break fixed elements even when nothing is being covered.
4. **The sticky element must not be inside another `transform`, `filter`, `perspective`, `contain: paint`, or `will-change: transform` ancestor.** Any of those turns the ancestor into the containing block and sticky will position relative to *that*, not the viewport. If the page shell already has a transformed ancestor near the root, that is a bug that must be fixed first.
5. **No `overflow: hidden` on any ancestor between the sticky element and the scroll container.** `overflow: hidden`, `overflow-x: clip` is fine, but `overflow: hidden` (or `auto`/`scroll`) makes the element a scroll container and kills `position: sticky`. Use `overflow-x: clip` if you need to prevent horizontal overflow.

### Required DOM shape

```html
<div class="stack">
  <section class="layer">
    <div class="layer__inner"><!-- visible content --></div>
    <div class="layer__shade" aria-hidden="true"></div>
  </section>
  <section class="layer">
    <div class="layer__inner">…</div>
    <div class="layer__shade" aria-hidden="true"></div>
  </section>
  <!-- last layer: no shade, not sticky -->
  <section class="layer layer--last">
    <div class="layer__inner">…</div>
  </section>
</div>
```

Names are not sacred — `.stack` / `.layer` / `.layer__inner` / `.layer__shade` is a convention. The **structure** is: outer wrapper → repeated sticky panels → each panel has an inner content wrapper and a shade sibling → last panel has no shade and is `position: relative`.

### Required JS shape

```js
const layers = [...document.querySelectorAll('.stack > .layer')];
const pinned = layers.slice(0, -1).map((layer, i) => ({
  inner: layer.querySelector('.layer__inner'),
  shade: layer.querySelector('.layer__shade'),
  next:  layers[i + 1],
}));

const RECEDE_SCALE = 0.9;
const RECEDE_SHADE = 0.55;
const phone = window.matchMedia('(max-width: 639px)');

let raf = null;
function apply() {
  const vh = window.innerHeight || 1;
  const shrink = phone.matches ? 0 : 1 - RECEDE_SCALE;
  for (const { inner, shade, next } of pinned) {
    const p = Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh));
    inner.style.transform = p > 0 && shrink > 0 ? `scale(${1 - shrink * p})` : '';
    inner.style.willChange = p > 0 && shrink > 0 ? 'transform' : '';
    shade.style.opacity = String(RECEDE_SHADE * p);
    inner.style.visibility = p >= 1 ? 'hidden' : 'visible';
  }
}

window.addEventListener('scroll', () => {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(apply);
}, { passive: true });
window.addEventListener('resize', apply);
apply();
```

Write exactly this logic. Do not replace it with `IntersectionObserver`, a scroll library, GSAP, Framer Motion, or CSS `animation-timeline`. The scroll-linked, reversible, frame-coalesced nature of this loop is the point — a library will hide the failure modes when the containing-block or overflow rule is broken.

### What to tell me (the user) when you're done

- List every panel you made sticky and confirm the last one is `position: relative`.
- Confirm no ancestor between a sticky panel and `<body>` has `transform`, `filter`, `perspective`, `contain: paint`, `will-change: transform`, or `overflow: hidden|auto|scroll`.
- Confirm the transform is on `.layer__inner` and not on `.layer`.
- Give me the two tuning constants (`RECEDE_SCALE`, `RECEDE_SHADE`) so I can adjust the strength in one place.

### What "done" looks like

Scroll down: panel 1 sits pinned; panel 2 slides up over it; as panel 2 approaches, panel 1 visibly shrinks toward 90% and darkens toward 55% black; panel 2 arrives fully, panel 1 stops painting; scroll continues into panel 2 as it too becomes the pinned one; panel 3 does the same to panel 2; when panel 3 arrives, the stack ends and normal page flow resumes below it. Scroll back up and the whole thing runs in reverse, smoothly, with no jitter and no state desync.

### Common failure modes — check for these before declaring done

| Symptom | Cause |
|---|---|
| Panel scrolls away instead of sticking | `overflow: hidden` on an ancestor, or a transformed ancestor |
| A `position: fixed` loader/modal is centered on the panel, not the viewport | `transform` on the sticky element itself, or a persistent `scale(1)` |
| Jank on scroll | Not coalescing scroll into `rAF`, or calling `getBoundingClientRect` many times per event |
| Recede doesn't reverse when scrolling up | Using `IntersectionObserver` or a one-shot animation instead of scroll-linked progress |
| Panels slide *under* instead of over each other | `z-index` not increasing per panel |
| Mobile looks broken | Scale not disabled below ~640px |
| Dead canvas still burning GPU after covered | Not setting `visibility: hidden` at `p >= 1` |

---

Feel free to drop the "common failure modes" table if it feels patronizing to your assistant — but in practice that table is what catches the bug *before* you spend an hour debugging why your `position: fixed` loader is in the wrong place.
