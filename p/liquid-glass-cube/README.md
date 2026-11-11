# Liquid Glass Cube

Interactive 3D liquid glass for the web — real-time ray-traced refraction, rainbow edges and a glowing core in a single dependency-free WebGL2 file.

- **5 shapes** — cube, sphere, ring, capsule, pane (they morph into each other)
- **6 scenes** — Studio, Midnight, Sunset, Glacier, Ink, Aurora (each paints its own backdrop and lights the glass to match)
- **Playground** with a live control dock, plus Gallery, Hero and Glass-pane examples
- Vanilla JavaScript + WebGL2 · no libraries, no build step · mouse, touch and reduced-motion aware

## What's inside

```
Liquid Glass Cube/
├── index.html                  Playground (scene, shape and tuning controls)
├── examples/
│   ├── gallery.html            Six instances on one page
│   ├── hero.html               Full-bleed hero with HTML around the canvas
│   └── glass-pane.html         Glass pane that magnifies live text
├── assets/js/liquid-glass-cube.js
├── README.md
└── LICENSE.txt
```

Open `index.html` in any modern browser — nothing to install. (Serving from `file://` works.)

## Quick start

```html
<canvas data-liquid-glass data-shape="cube" data-scene="studio"
        style="width:100%;height:480px"></canvas>
<script src="assets/js/liquid-glass-cube.js"></script>
```

Or from JavaScript:

```js
const glass = LiquidGlassCube.create('#canvas', {
  shape: 'ring',      // cube | sphere | ring | capsule | pane
  scene: 'aurora',    // studio | midnight | sunset | glacier | ink | aurora
  text: 'Hello'       // the word painted behind the glass
});

glass.set({ shape: 'pane', ior: 1.6 });   // morphs smoothly
glass.setScene('sunset');                 // cross-fades backdrop and lighting
const png = glass.snapshot();             // PNG data URL
glass.destroy();
```

## Options

| Option | Default | What it does |
| --- | --- | --- |
| `shape` | `'cube'` | `cube`, `sphere`, `ring`, `capsule`, `pane` |
| `scene` | `'studio'` | `studio`, `midnight`, `sunset`, `glacier`, `ink`, `aurora` |
| `text` | scene word | Word painted behind the glass. `null` = the scene's own word, `''` = none |
| `hint` | `'Drag to rotate'` | Hint painted on the backdrop. `''` hides it |
| `ior` | `1.47` | Index of refraction (1.2 – 1.9) |
| `dispersion` | `0.012` | Rainbow fringes on the edges (0 – 0.05) |
| `magnify` | `0.14` | Lens magnification (0 – 0.6) |
| `core` | `true` | Glowing core inside the glass |
| `spin` / `spinSpeed` | `true` / `1` | Idle rotation |
| `interactive` | `true` | Drag, press and pointer-driven light |
| `faceBend` | `0.16` | 0 = perfectly flat faces, 1 = fully refracting faces |
| `roundBend` | `0.72` | How hard round shapes bend the backdrop |
| `maxPixelRatio` | `2` | Cap for device pixel ratio |
| `maxSize` | `680` | Largest edge of the glass stage, in CSS pixels |

### Data attributes

`data-shape`, `data-scene`, `data-text`, `data-hint`, `data-ior`, `data-dispersion`, `data-magnify`, `data-spin-speed`, `data-core="false"`, `data-spin="false"`, `data-interactive="false"`.

### Methods and events

`set(options)`, `setShape(name)`, `setScene(name)`, `getState()`, `snapshot()`, `destroy()`, `on('shape' | 'scene', fn)`.

`LiquidGlassCube.shapes` and `LiquidGlassCube.scenes` expose the built-in definitions (labels, swatches, UI mode).

## Make your own scene

A scene is a plain object: a painted backdrop (gradient, blobs, grid/lines/rings/stars) plus the light studio colours the glass reflects. Copy one of the entries in `SCENES` inside `liquid-glass-cube.js`, change the colours and add it under a new key — it appears in `LiquidGlassCube.scenes` automatically.

## Good to know

- The glass bends what is painted **inside the canvas**. Put the headline you want refracted into `text`; everything else on your page stays regular HTML.
- Each canvas owns one WebGL2 context. Six per page works well; pause off-screen canvases automatically.
- Resolution adapts on slower GPUs. With `prefers-reduced-motion` the glass stays still and transitions are instant.
- Without WebGL2 the backdrop is drawn flat so the page still looks right.

## Browser support

Current Chrome, Edge, Safari 15+, Firefox — anything with WebGL2.
