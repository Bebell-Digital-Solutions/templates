/*!
 * Liquid Glass Cube v2.0
 * Real-time raymarched liquid glass in plain WebGL2 — no dependencies.
 *
 *   5 shapes  : cube, sphere, ring, capsule, pane   (they morph into each other)
 *   6 scenes  : studio, midnight, sunset, glacier, ink, aurora
 *
 * Quick start
 *   <canvas data-liquid-glass data-shape="cube" data-scene="studio"></canvas>
 *   <script src="assets/js/liquid-glass-cube.js"></script>
 *
 * Or from JavaScript
 *   var glass = LiquidGlassCube.create('#canvas', { shape: 'ring', scene: 'aurora', text: 'Hello' });
 *   glass.set({ shape: 'pane', ior: 1.6 });
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ *
   *  Shapes
   * ------------------------------------------------------------------ */
  var SHAPES = {
    cube:    { ext: [0.429, 0.429, 0.429], rad: 0.106, torus: 0, label: 'Cube',    core: 0.118, round: 0, mag: 1.0, rest: [0.52, 0.68, 0.0],  spin: [0.12, 0.17], limit: 0 },
    sphere:  { ext: [0, 0, 0], rad: 0.66, torus: 0, label: 'Sphere',  core: 0.170, round: 1, mag: 1.0, rest: [0.20, 0.40, 0.0],  spin: [0.06, 0.15], limit: 0 },
    ring:    { ext: [0, 0, 0], rad: 0.66, torus: 1, label: 'Ring',    core: 0.000, round: 1, mag: 1.0, rest: [1.00, 0.30, 0.0],  spin: [0.00, 0.20], limit: 0 },
    capsule: { ext: [0, 0.36, 0], rad: 0.29, torus: 0, label: 'Capsule', core: 0.130, round: 1, mag: 1.0, rest: [0.30, 0.50, 0.55], spin: [0.00, 0.18], limit: 0 },
    pane:    { ext: [0.76, 0.43, 0.01], rad: 0.12, torus: 0, label: 'Pane',    core: 0.000, round: 0, mag: 3.2, rest: [0.06, 0.20, 0.0],  spin: [0.00, 0.00], limit: 0.62 }
  };

  /* ------------------------------------------------------------------ *
   *  Scenes — a scene is a painted backdrop + a matching light studio
   * ------------------------------------------------------------------ */
  var SCENES = {
    studio: {
      label: 'Studio', text: 'Glass', ui: 'light',
      swatch: 'linear-gradient(135deg,#ff9669,#6e96ff 55%,#c4fa5a)',
      bg: ['#f7f7f5', '#efeeeb', '#e6e5e1'], glow: [255, 255, 255],
      blobs: [[-0.42, -0.20, 0.42, '255,150,105', 0.42], [0.46, 0.10, 0.48, '110,150,255', 0.38], [0.05, 0.40, 0.30, '196,250,90', 0.40]],
      decor: [],
      ink: '#1d1d1f', hint: 'rgba(29,29,31,0.48)',
      core: [0.79, 1.0, 0.31], absorb: [0.055, 0.018, 0.032], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.68, 0.69, 0.70], hi: [0.975, 0.98, 0.99], floor: [0.86, 0.85, 0.83], softLo: [0.90, 0.905, 0.91], softHi: [1, 1, 1], flag: [0.10, 0.11, 0.115], boost: 1.0 }
    },
    midnight: {
      label: 'Midnight', text: 'Neon', ui: 'dark',
      swatch: 'linear-gradient(135deg,#7a4bff,#1fd0ff 60%,#ff3fa4)',
      bg: ['#06070f', '#0b0d1f', '#07081a'], glow: null,
      blobs: [[-0.40, -0.12, 0.55, '125,80,255', 0.62], [0.44, 0.14, 0.52, '30,200,255', 0.50], [0.02, 0.44, 0.38, '255,60,165', 0.45]],
      decor: [{ type: 'grid', step: 0.085, color: 'rgba(160,190,255,0.13)', width: 1 }],
      ink: '#ffffff', glowText: 'rgba(120,170,255,0.55)', hint: 'rgba(255,255,255,0.45)',
      core: [0.35, 0.85, 1.0], absorb: [0.09, 0.05, 0.012], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.03, 0.035, 0.07], hi: [0.10, 0.12, 0.21], floor: [0.05, 0.05, 0.09], softLo: [0.07, 0.08, 0.15], softHi: [0.17, 0.19, 0.32], flag: [0.0, 0.0, 0.01], boost: 1.2 }
    },
    sunset: {
      label: 'Sunset', text: 'Dusk', ui: 'light',
      swatch: 'linear-gradient(135deg,#ffd27a,#ff7a6b 55%,#a83fd6)',
      bg: ['#ffe3c2', '#ffab85', '#d85a8a'], glow: [255, 244, 220],
      blobs: [[-0.38, -0.24, 0.50, '255,215,110', 0.65], [0.44, 0.06, 0.52, '255,70,130', 0.50], [0.04, 0.46, 0.40, '150,60,220', 0.50]],
      decor: [{ type: 'rings', count: 9, step: 0.11, color: 'rgba(255,244,232,0.30)', width: 1.4, dy: -0.04 }],
      ink: '#fff6ea', glowText: 'rgba(255,120,90,0.35)', hint: 'rgba(255,246,234,0.7)',
      core: [1.0, 0.74, 0.26], absorb: [0.02, 0.045, 0.08], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.62, 0.46, 0.43], hi: [1.0, 0.93, 0.87], floor: [0.9, 0.7, 0.6], softLo: [0.85, 0.72, 0.68], softHi: [1.0, 0.94, 0.88], flag: [0.18, 0.08, 0.10], boost: 1.0 }
    },
    glacier: {
      label: 'Glacier', text: 'Frost', ui: 'light',
      swatch: 'linear-gradient(135deg,#d7f5f5,#4fd0d0 50%,#4a82ff)',
      bg: ['#f0fafa', '#d6edf0', '#b7d9e4'], glow: [255, 255, 255],
      blobs: [[-0.42, -0.14, 0.50, '60,205,205', 0.50], [0.46, 0.12, 0.50, '80,140,255', 0.42], [0.00, 0.44, 0.36, '255,255,255', 0.80]],
      decor: [{ type: 'lines', angle: -0.5, step: 0.07, color: 'rgba(10,70,90,0.10)', width: 1.2 }],
      ink: '#0b3b46', hint: 'rgba(11,59,70,0.55)',
      core: [0.30, 0.92, 0.98], absorb: [0.065, 0.02, 0.012], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.62, 0.72, 0.74], hi: [0.95, 0.99, 1.0], floor: [0.78, 0.86, 0.88], softLo: [0.86, 0.92, 0.93], softHi: [1.0, 1.0, 1.0], flag: [0.07, 0.12, 0.14], boost: 1.0 }
    },
    ink: {
      label: 'Ink', text: 'Ink', ui: 'light',
      swatch: 'linear-gradient(135deg,#f6f6f4 45%,#111 45%,#111 55%,#ff3b25 55%)',
      bg: ['#f6f6f3', '#f1f1ee', '#ebebe7'], glow: [255, 255, 255],
      blobs: [[0.30, -0.12, 0.22, '255,59,37', 0.85]],
      decor: [{ type: 'grid', step: 0.05, color: 'rgba(0,0,0,0.55)', width: 1.1 }],
      ink: '#0c0c0c', hint: 'rgba(0,0,0,0.5)',
      core: [1.0, 0.2, 0.14], absorb: [0.02, 0.02, 0.02], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.70, 0.70, 0.69], hi: [0.98, 0.98, 0.97], floor: [0.85, 0.85, 0.83], softLo: [0.90, 0.90, 0.90], softHi: [1, 1, 1], flag: [0.04, 0.04, 0.04], boost: 1.0 }
    },
    aurora: {
      label: 'Aurora', text: 'Aurora', ui: 'dark',
      swatch: 'linear-gradient(135deg,#0a2a2a,#3cffb0 45%,#a55bff 75%,#ff5ac8)',
      bg: ['#03100f', '#06191c', '#04100f'], glow: null,
      blobs: [[-0.30, -0.26, 0.72, '60,255,170', 0.55, 2.2, -0.35], [0.28, -0.04, 0.70, '40,170,255', 0.40, 2.4, 0.30], [0.05, 0.30, 0.62, '165,90,255', 0.50, 2.0, -0.12], [0.40, 0.46, 0.34, '255,90,200', 0.40]],
      decor: [{ type: 'stars', count: 90, seed: 7 }],
      ink: '#f2fffb', glowText: 'rgba(90,255,190,0.45)', hint: 'rgba(242,255,251,0.5)',
      core: [1.0, 0.40, 0.78], absorb: [0.07, 0.015, 0.04], light: [-0.32, 0.52, 0.79],
      env: { lo: [0.02, 0.05, 0.05], hi: [0.08, 0.17, 0.18], floor: [0.03, 0.07, 0.07], softLo: [0.06, 0.11, 0.12], softHi: [0.14, 0.27, 0.28], flag: [0.0, 0.01, 0.01], boost: 1.15 }
    }
  };

  var DEFAULTS = {
    shape: 'cube',
    scene: 'studio',
    text: null,              // null = the scene's own word
    hint: 'Drag to rotate',  // '' hides the hint painted on the backdrop
    ior: 1.47,               // index of refraction
    dispersion: 0.012,       // rainbow edges
    magnify: 0.14,           // lens magnification
    waviness: 0.0006,        // hand-made imperfection of the surface (0 = perfectly smooth)
    faceBend: 0.16,          // 0 = perfectly flat faces, 1 = fully refracting faces
    roundBend: 0.72,         // how hard round shapes bend the backdrop
    core: true,              // glowing core inside the glass
    spin: true,              // idle rotation
    spinSpeed: 1,
    interactive: true,       // drag / press / hover light
    maxPixelRatio: 2,
    maxSize: 680             // largest edge of the glass stage, CSS px
  };

  var CAMERA = { z: 4.4, focal: 1.75, wallZ: -1.35, halfSize: 0.535, cornerRadius: 0.106 };

  /* ------------------------------------------------------------------ *
   *  Shaders
   * ------------------------------------------------------------------ */
  var VERT = '#version 300 es\n' +
    'void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }';

  var FRAG = '#version 300 es\n' + [
    'precision highp float;',
    'out vec4 fragColor;',
    'uniform vec2 uRes, uCenter;',
    'uniform float uUnit, uFocal, uCamZ, uWallZ;',
    'uniform mat3 uRot;',
    'uniform float uB, uCore, uScale, uRad, uTorus, uRound, uRoundBend, uMagK;',
    'uniform vec3 uExt;',
    'uniform int uSteps, uStepsA, uStepsB;',
    'uniform vec3 uLight, uCoreCol;',
    'uniform sampler2D uWall;',
    'uniform float uIor, uDisp, uWave, uFlat, uMag, uGlow, uReveal;',
    'uniform vec2 uTouch;',
    'uniform vec3 uAbsorb;',
    'uniform vec3 uEnvLo, uEnvHi, uEnvFloor, uSoftLo, uSoftHi, uFlagCol;',
    'uniform float uBoost;',

    /* ---- shapes: ONE rounded-box family (cube, sphere, capsule, pane) + torus, blended by uniforms ---- */
    'float sdRoundBox(vec3 p, vec3 e, float r){ vec3 q = abs(p) - e; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }',
    'float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }',
    'float map(vec3 p){',
    '  vec3 q = uRot * p / uScale;',
    '  float d = sdRoundBox(q, uExt, uRad);',
    '  if (uTorus > 0.0) d = mix(d, sdTorus(q, vec2(0.43, 0.22)), uTorus);',
    '  return d * uScale;',
    '}',
    'vec3 nrm(vec3 p){ const vec2 k = vec2(1.0, -1.0); float h = max(0.0007, distance(p, vec3(0.0, 0.0, uCamZ)) / (uUnit * uFocal));',
    '  return normalize(k.xyy * map(p + k.xyy * h) + k.yyx * map(p + k.yyx * h) + k.yxy * map(p + k.yxy * h) + k.xxx * map(p + k.xxx * h)); }',
    'float hitSphere(vec3 o, vec3 d, float r){ float b = dot(o, d); float c = dot(o, o) - r*r; float h = b*b - c; if (h < 0.0) return -1.0; return -b - sqrt(h); }',

    /* ---- surface ---- */
    'vec3 surfN(vec3 p){',
    '  vec3 n = nrm(p);',
    '  vec3 o = uRot * p;',
    '  vec3 w = vec3(sin(o.y * 5.3 + o.z * 3.1 + 0.7), sin(o.z * 4.6 + o.x * 5.7 + 1.9), sin(o.x * 4.1 + o.y * 3.7 + 3.1))',
    '         + 0.5 * vec3(sin(o.z * 11.0 + o.x * 7.0), sin(o.x * 9.0 + o.y * 12.0), sin(o.y * 10.0 + o.z * 8.0));',
    '  return normalize(n + transpose(uRot) * w * uWave);',
    '}',
    'float fresnel(float cosi, float eta){',
    '  float s2 = eta * eta * (1.0 - cosi * cosi);',
    '  if (s2 >= 1.0) return 1.0;',
    '  float ct = sqrt(1.0 - s2);',
    '  float rs = (eta * cosi - ct) / (eta * cosi + ct);',
    '  float rp = (cosi - eta * ct) / (cosi + eta * ct);',
    '  return 0.5 * (rs * rs + rp * rp);',
    '}',

    /* ---- light studio (colours come from the active scene) ---- */
    'vec3 env(vec3 d){',
    '  float y = d.y; float phi = atan(d.x, d.z);',
    '  vec3 c = mix(uEnvLo, uEnvHi, smoothstep(-0.55, 0.35, y));',
    '  c = mix(c, uEnvFloor, smoothstep(-0.2, -0.75, y) * 0.5);',
    '  c += vec3(0.30) * uBoost * smoothstep(0.62, 0.86, y) * smoothstep(1.2, 0.5, abs(phi));',
    '  float stripL = smoothstep(0.16, 0.05, abs(phi + 1.30)) * smoothstep(0.75, 0.45, abs(y - 0.08));',
    '  float stripR = smoothstep(0.07, 0.02, abs(phi - 1.42)) * smoothstep(0.70, 0.40, abs(y - 0.05));',
    '  float kick = smoothstep(0.05, 0.015, abs(phi - 0.35)) * smoothstep(0.30, 0.12, abs(y + 0.42));',
    '  c += (vec3(1.25, 1.24, 1.22) * stripL + vec3(1.05, 1.08, 1.15) * stripR + vec3(1.6) * kick) * uBoost;',
    '  float flag1 = smoothstep(0.075, 0.0, abs(phi + 0.62)) * smoothstep(0.9, 0.5, abs(y));',
    '  float flag2 = smoothstep(0.06, 0.0, abs(phi - 2.35)) * smoothstep(0.9, 0.5, abs(y));',
    '  float flag3 = smoothstep(0.05, 0.0, abs(phi - 0.78)) * smoothstep(0.55, 0.25, abs(y + 0.15)) * 0.7;',
    '  c = mix(c, uFlagCol, clamp(flag1 + flag2 * 0.85 + flag3, 0.0, 1.0));',
    '  float k = dot(d, uLight);',
    '  c += (vec3(3.2, 3.15, 3.0) * smoothstep(0.9965, 0.9995, k) + vec3(0.18) * smoothstep(0.90, 1.0, k)) * uBoost;',
    '  return c;',
    '}',
    'vec3 envSoft(vec3 d){ return mix(uSoftLo, uSoftHi, smoothstep(-0.6, 0.6, d.y)); }',

    /* ---- backdrop seen through / reflected by the glass ---- */
    'float gZoom = 1.0;',
    'vec3 wallAt(vec3 o, vec3 d, float lod){',
    '  float t = (uWallZ - o.z) / min(d.z, -1e-3);',
    '  vec3 P = o + d * t;',
    '  P.xy /= gZoom;',
    '  vec2 px = uCenter + P.xy * (uFocal / (uCamZ - uWallZ)) * uUnit;',
    '  return textureLod(uWall, clamp(px / uRes, vec2(0.001), vec2(0.999)), lod).rgb;',
    '}',
    'vec3 scene(vec3 o, vec3 d, float lod){',
    '  float k = smoothstep(-0.05, -0.32, d.z);',
    '  vec3 e = env(d);',
    '  if (k <= 0.0) return e;',
    '  return mix(e, wallAt(o, d, lod), k);',
    '}',
    'float sceneCh(vec3 o, vec3 d, float lod, int ch){ vec3 c = scene(o, d, lod); return ch == 0 ? c.r : (ch == 1 ? c.g : c.b); }',

    /* ---- glowing core ---- */
    'vec3 shadeCore(vec3 sn, vec3 d){',
    '  float ndl = clamp(dot(sn, uLight), 0.0, 1.0);',
    '  float rim = pow(1.0 - abs(dot(sn, -d)), 2.0);',
    '  vec3 c = uCoreCol * (0.74 + 0.34 * ndl);',
    '  c = mix(c, uCoreCol * vec3(0.38, 0.52, 0.20), rim * 0.55);',
    '  vec3 o = uRot * sn;',
    '  float ring = max(smoothstep(0.13, 0.07, abs(o.y)), smoothstep(0.13, 0.07, abs(o.x)));',
    '  float lip = max(smoothstep(0.16, 0.13, abs(o.y)) * smoothstep(0.10, 0.13, abs(o.y)),',
    '                  smoothstep(0.16, 0.13, abs(o.x)) * smoothstep(0.10, 0.13, abs(o.x)));',
    '  c = mix(c, uCoreCol * vec3(0.46, 0.56, 0.26), ring * 0.85);',
    '  c += vec3(0.20, 0.22, 0.10) * lip * (0.4 + 0.6 * ndl);',
    '  c += vec3(1.0, 1.0, 0.85) * pow(max(dot(reflect(d, sn), uLight), 0.0), 40.0) * 0.6;',
    '  return c;',
    '}',

    /* ---- liquid-glass optics: flat faces pass light straight, bevels and round forms bend it ---- */
    'float bevelW(vec3 n){',
    '  vec3 o = abs(uRot * n); float e = 1.0 - max(o.x, max(o.y, o.z));',
    '  float boxy = mix(uFlat, 1.0, smoothstep(0.0, 0.45, e));',
    '  return mix(boxy, uRoundBend, uRound);',
    '}',

    'vec3 transmit(vec3 p, vec3 rd, vec3 n){',
    '  vec3 nE = normalize(mix(-rd, n, bevelW(n)));',
    '  vec3 d = refract(rd, nE, 1.0 / uIor);',
    '  vec3 thr = vec3(1.0);',
    '  float s = 0.01;',
    '  for (int j = 0; j < uStepsA; j++){ float dd = -map(p + d * s); if (dd < 0.0005) break; s += max(dd, 0.002); }',
    '  vec3 q = p + d * s;',

    '  if (uCore > 0.001){',
    '    float cr = uCore * uScale;',
    '    float tcore = hitSphere(p, d, cr);',
    '    if (tcore > 0.0 && tcore < s){ return exp(-tcore * uAbsorb) * shadeCore(normalize(p + d * tcore), d); }',
    '    float gt = clamp(-dot(p, d), 0.0, s); float gd = length(p + d * gt);',
    '    float g = exp(-pow(max(gd - cr, 0.0), 2.0) * 120.0) * 0.42 + exp(-gd * gd * 22.0) * 0.05;',
    '    thr *= mix(vec3(1.0), uCoreCol, clamp(g, 0.0, 0.7));',
    '  }',
    '  thr *= exp(-s * uAbsorb);',

    '  vec3 n2g = surfN(q);',
    '  float bw = bevelW(n2g);',
    '  vec3 n2 = normalize(mix(d, n2g, bw));',
    '  float F = fresnel(clamp(dot(d, n2), 0.0, 1.0), uIor);',
    '  gZoom = 1.0 + uMag * uMagK * clamp(s / (2.0 * uB), 0.0, 1.6);',
    '  float disp = uDisp * (1.0 + 3.0 * smoothstep(uFlat, 1.0, bw)) * smoothstep(0.0, 0.4, clamp(dot(-rd, n), 0.0, 1.0));',
    '  vec3 iors = vec3(uIor - disp, uIor, uIor + disp);',
    '  if (F < 1.0){',
    '    float lod = 0.25 + s * 0.8;',
    '    vec3 dG = refract(d, -n2, iors.y); if (dot(dG, dG) < 1e-4) dG = reflect(d, n2);',
    '    vec3 dR = refract(d, -n2, iors.x); if (dot(dR, dR) < 1e-4) dR = dG;',
    '    vec3 dB = refract(d, -n2, iors.z); if (dot(dB, dB) < 1e-4) dB = dG;',
    '    vec3 ex = vec3(scene(q, dR, lod).r, scene(q, dG, lod).g, scene(q, dB, lod).b);',
    '    gZoom = 1.0;',
    '    return thr * ((1.0 - F) * ex + F * envSoft(reflect(d, n2)));',
    '  }',
    '  gZoom = 1.0;',

    '  vec3 d3 = reflect(d, n2);',
    '  vec3 q1 = q + d3 * 0.003;',
    '  float s2 = 0.01;',
    '  for (int j = 0; j < uStepsB; j++){ float dd = -map(q1 + d3 * s2); if (dd < 0.0005) break; s2 += max(dd, 0.002); }',
    '  vec3 q2 = q1 + d3 * s2;',
    '  thr *= exp(-s2 * uAbsorb);',
    '  vec3 n3 = surfN(q2);',
    '  vec3 d4 = refract(d3, -n3, uIor);',
    '  if (dot(d4, d4) < 1e-4) return thr * envSoft(reflect(d3, n3)) * 0.92;',
    '  float F3 = fresnel(clamp(dot(d3, n3), 0.0, 1.0), uIor);',
    '  vec3 d4r = refract(d3, -n3, uIor - disp * 1.5), d4b = refract(d3, -n3, uIor + disp * 1.5);',
    '  if (dot(d4r, d4r) < 1e-4) d4r = d4;',
    '  if (dot(d4b, d4b) < 1e-4) d4b = d4;',
    '  vec3 out4 = vec3(mix(scene(q2, d4r, 2.0), env(d4r), 0.5).r, mix(scene(q2, d4, 2.0), env(d4), 0.5).g, mix(scene(q2, d4b, 2.0), env(d4b), 0.5).b);',
    '  return thr * ((1.0 - F3) * out4 + F3 * envSoft(d4)) * 0.97;',
    '}',

    'vec3 shoulder(vec3 c){ vec3 x = max(c - 0.82, 0.0); return min(c, 0.82) + 0.18 * (1.0 - exp(-x / 0.18)); }',

    'void main(){',
    '  vec2 fc = gl_FragCoord.xy;',
    '  vec3 bg = textureLod(uWall, fc / uRes, 0.0).rgb;',
    '  vec2 uv = (fc - uCenter) / uUnit;',
    '  vec3 ro = vec3(0.0, 0.0, uCamZ);',
    '  vec3 rd = normalize(vec3(uv, -uFocal));',

    '  float bb = dot(ro, rd); float bc = dot(ro, ro) - 1.32;',
    '  if (bb * bb - bc < 0.0){ fragColor = vec4(bg, 1.0); return; }',

    '  float pix = 1.0 / (uUnit * uFocal);',
    '  float t = 0.0, md = 1e9, tmd = 0.0; bool hit = false;',
    '  for (int i = 0; i < uSteps; i++){',
    '    float d = map(ro + rd * t);',
    '    if (d < md){ md = d; tmd = t; }',
    '    if (d < max(0.0004, t * pix * 0.7)){ hit = true; break; }',
    '    t += d; if (t > 7.0) break;',
    '  }',
    '  float cov = 1.0; vec3 p;',
    '  if (hit) p = ro + rd * (t + max(map(ro + rd * t), 0.0));',
    '  else {',
    '    float pf = tmd / (uUnit * uFocal) * 1.25;',
    '    cov = clamp(1.0 - md / pf, 0.0, 1.0);',
    '    if (cov <= 0.0){ fragColor = vec4(bg, 1.0); return; }',
    '    p = ro + rd * tmd;',
    '  }',

    '  vec3 n = surfN(p);',
    '  float cosi = clamp(dot(-rd, n), 0.0, 1.0);',
    '  float F = fresnel(cosi, 1.0 / uIor);',

    '  vec3 rdir = reflect(rd, n);',
    '  vec3 refl = scene(p, rdir, 2.5);',
    '  refl += vec3(2.4) * uBoost * pow(max(dot(rdir, uLight), 0.0), 900.0);',
    '  refl += vec3(1.5, 1.55, 1.65) * uBoost * pow(max(dot(rdir, normalize(vec3(0.62, -0.18, 0.76))), 0.0), 500.0);',

    '  vec3 on = abs(uRot * n);',
    '  float edge = 1.0 - max(on.x, max(on.y, on.z));',
    '  float bevel = mix(smoothstep(0.015, 0.20, edge), smoothstep(0.30, 0.95, 1.0 - cosi), uRound);',
    '  float facing = max(dot(n, normalize(uLight + vec3(0.0, 0.0, 0.6))), 0.0);',
    '  vec3 rim = vec3(1.0, 1.0, 0.985) * bevel * (0.12 + 0.75 * pow(facing, 3.0)) * (0.35 + 0.65 * pow(1.0 - cosi, 0.6));',

    '  vec3 tr = transmit(p, rd, n);',
    '  vec3 col = tr * (1.0 - F) + refl * F + rim;',
    '  float tg = uGlow * exp(-dot(fc - uTouch, fc - uTouch) / (uUnit * uUnit * 0.03));',
    '  col += vec3(1.0, 1.0, 0.97) * tg * (0.45 + 0.55 * bevel) * 1.15 + vec3(0.05, 0.07, 0.0) * tg;',
    '  col = mix(bg, col, 0.08 + 0.92 * smoothstep(0.0, 0.24, cosi));   // soft silhouette: no sparkling pixels on grazing edges',
    '  col = shoulder(col);',

    '  fragColor = vec4(mix(bg, col, cov * smoothstep(0.0, 0.55, uReveal)), 1.0);',
    '}'
  ].join('\n');

  /* ------------------------------------------------------------------ *
   *  Backdrop painter (Canvas 2D). Everything the glass bends is drawn here.
   * ------------------------------------------------------------------ */
  var FONT = 'system-ui, -apple-system, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

  function paintBlob(ctx, cx, cy, u, b) {
    var r = b[2] * u, sx = b[5] || 1, rot = b[6] || 0;
    ctx.save();
    ctx.translate(cx + b[0] * u, cy + b[1] * u);
    ctx.rotate(rot);
    ctx.scale(sx, 1);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, 'rgba(' + b[3] + ',' + b[4] + ')');
    g.addColorStop(0.55, 'rgba(' + b[3] + ',' + (b[4] * 0.35) + ')');
    g.addColorStop(1, 'rgba(' + b[3] + ',0)');
    ctx.fillStyle = g;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
  }

  function paintDecor(ctx, w, h, cx, cy, u, dpr, d) {
    ctx.save();
    if (d.type === 'grid') {
      var st = d.step * u;
      ctx.strokeStyle = d.color; ctx.lineWidth = d.width * dpr;
      ctx.beginPath();
      for (var x = cx % st; x < w; x += st) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, h); }
      for (var y = cy % st; y < h; y += st) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(w, Math.round(y) + 0.5); }
      ctx.stroke();
    } else if (d.type === 'lines') {
      var s2 = d.step * u, diag = Math.sqrt(w * w + h * h);
      ctx.translate(cx, cy); ctx.rotate(d.angle);
      ctx.strokeStyle = d.color; ctx.lineWidth = d.width * dpr;
      ctx.beginPath();
      for (var k = -diag; k < diag; k += s2) { ctx.moveTo(-diag, k); ctx.lineTo(diag, k); }
      ctx.stroke();
    } else if (d.type === 'rings') {
      ctx.strokeStyle = d.color; ctx.lineWidth = d.width * dpr;
      for (var i = 1; i <= d.count; i++) { ctx.beginPath(); ctx.arc(cx, cy + (d.dy || 0) * u, i * d.step * u, 0, Math.PI * 2); ctx.stroke(); }
    } else if (d.type === 'stars') {
      var rnd = rng(d.seed || 3);
      for (var j = 0; j < d.count; j++) {
        var px = rnd() * w, py = rnd() * h, pr = (0.6 + rnd() * 1.4) * dpr;
        ctx.fillStyle = 'rgba(255,255,255,' + (0.25 + rnd() * 0.55) + ')';
        ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function paintWall(ctx, w, h, u, dpr, sc, text, hint) {
    var cx = w / 2, cy = h / 2, i;
    var g = ctx.createLinearGradient(0, 0, 0, h);
    for (i = 0; i < sc.bg.length; i++) g.addColorStop(i / (sc.bg.length - 1), sc.bg[i]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    if (sc.glow) {
      var f = ctx.createRadialGradient(cx - 0.35 * u, cy - 0.55 * u, 0, cx - 0.35 * u, cy - 0.55 * u, 1.6 * u);
      f.addColorStop(0, 'rgba(' + sc.glow.join(',') + ',0.85)'); f.addColorStop(1, 'rgba(' + sc.glow.join(',') + ',0)');
      ctx.fillStyle = f; ctx.fillRect(0, 0, w, h);
    }
    for (i = 0; i < sc.blobs.length; i++) paintBlob(ctx, cx, cy, u, sc.blobs[i]);
    for (i = 0; i < sc.decor.length; i++) paintDecor(ctx, w, h, cx, cy, u, dpr, sc.decor[i]);

    if (text) {
      ctx.fillStyle = sc.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var size = Math.round(0.4 * u);
      var setFont = function () { ctx.font = '700 ' + size + 'px ' + FONT; if ('letterSpacing' in ctx) ctx.letterSpacing = (-0.035 * size) + 'px'; };
      setFont();
      var tw = ctx.measureText(text).width;
      if (tw > w * 0.9) { size = Math.floor(size * (w * 0.9) / tw); setFont(); }
      if (sc.glowText) { ctx.shadowColor = sc.glowText; ctx.shadowBlur = size * 0.22; }
      ctx.fillText(text, cx, cy + 0.02 * u);
      ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }
    if (hint) {
      ctx.font = '500 ' + Math.round(12.5 * dpr) + 'px ' + FONT;
      ctx.fillStyle = sc.hint; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(hint, w / 2, h - Math.round(28 * dpr));
    }
  }

  /* ------------------------------------------------------------------ *
   *  Helpers
   * ------------------------------------------------------------------ */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpArr(out, a, b, t) { for (var i = 0; i < a.length; i++) out[i] = lerp(a[i], b[i], t); return out; }
  function easeIO(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function norm3(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  // object-from-world matrix (transpose of Ry*Rx*Rz), column-major for GLSL
  function rotMatrix(rx, ry, rz) {
    var cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry), cz = Math.cos(rz), sz = Math.sin(rz);
    // R = Ry * Rx * Rz  (row-major)
    var Rx = [1, 0, 0, 0, cx, -sx, 0, sx, cx];
    var Ry = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];
    var Rz = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
    function mul(A, B) { var C = new Array(9); for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) C[r * 3 + c] = A[r * 3] * B[c] + A[r * 3 + 1] * B[3 + c] + A[r * 3 + 2] * B[6 + c]; return C; }
    var R = mul(mul(Ry, Rx), Rz);
    // M = R^T (row-major M[r][c] = R[c][r]); GLSL wants column-major, i.e. column c = row c of R
    return new Float32Array([R[0], R[1], R[2], R[3], R[4], R[5], R[6], R[7], R[8]]);
  }

  function compile(gl, type, src) {
    // no status query here: asking would block the page until the driver finishes compiling
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src); gl.compileShader(sh);
    return sh;
  }

  var instances = 0;

  /* ------------------------------------------------------------------ *
   *  Instance
   * ------------------------------------------------------------------ */
  function create(target, options) {
    var canvas = typeof target === 'string' ? document.querySelector(target) : target;
    if (!canvas) throw new Error('LiquidGlassCube: canvas not found');
    var cfg = Object.assign({}, DEFAULTS, options || {});
    if (!SHAPES[cfg.shape]) cfg.shape = 'cube';
    if (!SCENES[cfg.scene]) cfg.scene = 'studio';

    var listeners = {};
    function emit(name, data) { (listeners[name] || []).forEach(function (fn) { fn(data); }); }

    /* ---- offscreen backdrop canvases ---- */
    var wall = document.createElement('canvas'), wallCtx = wall.getContext('2d');
    var prev = document.createElement('canvas'), prevCtx = prev.getContext('2d');
    var mixed = document.createElement('canvas'), mixCtx = mixed.getContext('2d');
    var lastShown = wall;

    var gl = null;
    try {
      gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    } catch (e) { gl = null; }

    var reduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

    /* ---- state ---- */
    var shapeA = cfg.shape, shapeB = cfg.shape, morph = 1;
    var sceneKey = cfg.scene, sceneT = 1, fadeFrom = null;
    var cur = { core: [0, 0, 0], absorb: [0, 0, 0], light: [0, 0, 0], lo: [0, 0, 0], hi: [0, 0, 0], floor: [0, 0, 0], softLo: [0, 0, 0], softHi: [0, 0, 0], flag: [0, 0, 0], boost: [1] };
    function sceneTarget(key) {
      var s = SCENES[key];
      return { core: s.core, absorb: s.absorb, light: norm3(s.light), lo: s.env.lo, hi: s.env.hi, floor: s.env.floor, softLo: s.env.softLo, softHi: s.env.softHi, flag: s.env.flag, boost: [s.env.boost] };
    }
    var from = sceneTarget(sceneKey), to = from;
    Object.keys(cur).forEach(function (k) { cur[k] = from[k].slice(); });

    var userText = cfg.text;
    var rx0 = SHAPES[shapeA].rest[0], ry0 = SHAPES[shapeA].rest[1];
    var ax = 0, ay = 0;                 // idle rotation
    var ox = 0, oy = 0, vx = 0, vy = 0; // dragged rotation + inertia
    var dragging = false, lastPX = 0, lastPY = 0;
    var ptr = { x: 0, y: 0, tx: 0, ty: 0 }, par = { x: 0, y: 0 };
    var press = { v: 1, vel: 0, target: 1 }, glow = 0, touchX = -1e4, touchY = -1e4;
    var started = performance.now(), introMs = reduced.matches ? 0 : 1400;
    var qCeil = (++instances > 1 ? 0.72 : 1), quality = Math.min(qCeil, 0.5), fast = 0, slow = 0, frames = 0, sizeKey = '', autoSpin = true, softGL = false;
    // software renderers (no GPU acceleration) get a light start: low resolution, no endless idle spin
    try {
      var dbg = gl.getExtension('WEBGL_debug_renderer_info');
      var rn = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
      if (/swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(rn)) { qCeil = Math.min(qCeil, 0.4); quality = Math.min(quality, 0.4); autoSpin = false; softGL = true; }
    } catch (e) {}
    var visible = true, raf = 0, last = performance.now(), destroyed = false;
    var wallDirty = true, curW = 1, curH = 1, curUnit = 1, curDpr = 1;

    /* ---- fallback when WebGL2 is unavailable ---- */
    if (!gl) {
      canvas.classList.add('lg-no-webgl');
      var ctx2 = canvas.getContext('2d');
      var paintFallback = function () {
        var r = canvas.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(r.width * d)); canvas.height = Math.max(1, Math.round(r.height * d));
        var u = Math.max(120, Math.min(r.width * 0.86, r.height * 0.9, cfg.maxSize)) * d;
        paintWall(ctx2, canvas.width, canvas.height, u, d, SCENES[sceneKey], userText || SCENES[sceneKey].text, '');
      };
      paintFallback();
      window.addEventListener('resize', paintFallback);
      return { set: function () {}, on: function () {}, snapshot: function () { return canvas.toDataURL('image/png'); }, destroy: function () { window.removeEventListener('resize', paintFallback); }, webgl: false };
    }

    /* ---- program (compiled in parallel, never blocks the page) ---- */
    var prog, vs, fs, psc;
    function beginCompile() {
      prog = gl.createProgram();
      vs = compile(gl, gl.VERTEX_SHADER, VERT); fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      gl.attachShader(prog, vs); gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      psc = gl.getExtension('KHR_parallel_shader_compile');
      pollCompile();
    }
    var vao = gl.createVertexArray();
    var loc = {}, ready = false;
    canvas.style.background = SCENES[sceneKey].bg[1];

    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    function u1(n, v) { gl.uniform1f(loc[n], v); }
    function u3(n, a) { gl.uniform3f(loc[n], a[0], a[1], a[2]); }

    function finishSetup() {
      if (destroyed) return;
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        if (global.console) console.warn('LiquidGlassCube: ' + gl.getShaderInfoLog(fs) + gl.getProgramInfoLog(prog));
        canvas.classList.add('lg-no-webgl'); return;
      }
      gl.useProgram(prog); gl.bindVertexArray(vao);
      var nU = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < nU; i++) { var info = gl.getActiveUniform(prog, i); loc[info.name] = gl.getUniformLocation(prog, info.name); }
      gl.uniform1i(loc.uWall, 0);
      u1('uFocal', CAMERA.focal); u1('uCamZ', CAMERA.z); u1('uWallZ', CAMERA.wallZ);
      u1('uB', CAMERA.halfSize);
      gl.uniform1i(loc.uSteps, 96); gl.uniform1i(loc.uStepsA, 64); gl.uniform1i(loc.uStepsB, 48);
      ready = true; sizeKey = ''; started = performance.now();
      wake();
    }
    function pollCompile() {
      if (destroyed) return;
      if (!psc || gl.getProgramParameter(prog, psc.COMPLETION_STATUS_KHR)) finishSetup();
      else setTimeout(pollCompile, 16);
    }

    /* ---- backdrop upload ---- */
    function upload(src) {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.generateMipmap(gl.TEXTURE_2D);
      lastShown = src;
    }
    function currentText() { return userText != null ? userText : SCENES[sceneKey].text; }
    function repaintWall() {
      paintWall(wallCtx, curW, curH, curUnit, curDpr, SCENES[sceneKey], currentText(), cfg.hint);
      wallDirty = false;
    }

    var rectCache = null;
    function resize() {
      var r = rectCache || (rectCache = canvas.getBoundingClientRect());
      var uCss = Math.max(120, Math.min(r.width * 0.86, r.height * 0.9, cfg.maxSize));
      var d = Math.min(window.devicePixelRatio || 1, cfg.maxPixelRatio, 820 / (0.55 * uCss)) * quality;  // budget follows the glass, not the page: full sharpness on retina, still cheap
      var w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
      var unit = Math.max(120, Math.min(r.width * 0.86, r.height * 0.9, cfg.maxSize)) * d;
      var key = w + 'x' + h + ':' + unit.toFixed(1);
      if (key === sizeKey) return;
      sizeKey = key; curW = w; curH = h; curUnit = unit; curDpr = d;
      canvas.width = w; canvas.height = h;
      wall.width = prev.width = mixed.width = w; wall.height = prev.height = mixed.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.uRes, w, h); gl.uniform2f(loc.uCenter, w / 2, h / 2); u1('uUnit', unit);
      repaintWall(); upload(wall); sceneT = 1;
    }

    /* ---- public mutations ---- */
    function setShape(name) {
      if (!SHAPES[name] || name === shapeB) return;
      if (morph < 1 && morph > 0.5) shapeA = shapeB;
      shapeB = name; morph = reduced.matches ? 1 : 0;
      if (reduced.matches) shapeA = shapeB;
      cfg.shape = name; emit('shape', name); wake();
    }
    function setScene(name) {
      if (!SCENES[name] || name === sceneKey) return;
      prevCtx.clearRect(0, 0, curW, curH); prevCtx.drawImage(lastShown, 0, 0);
      from = { }; Object.keys(cur).forEach(function (k) { from[k] = cur[k].slice(); });
      sceneKey = name; to = sceneTarget(name);
      cfg.scene = name;
      repaintWall();
      sceneT = reduced.matches ? 1 : 0;
      if (sceneT === 1) { upload(wall); Object.keys(cur).forEach(function (k) { cur[k] = to[k].slice(); }); }
      emit('scene', name); wake();
    }
    function set(o) {
      if (!o) return;
      if (o.shape) setShape(o.shape);
      if (o.scene) setScene(o.scene);
      if ('text' in o) { userText = (o.text === '' || o.text == null) ? (o.text === '' ? '' : null) : String(o.text); wallDirty = true; }
      if ('hint' in o) { cfg.hint = o.hint; wallDirty = true; }
      ['ior', 'dispersion', 'magnify', 'waviness', 'faceBend', 'roundBend', 'spinSpeed'].forEach(function (k) { if (k in o) cfg[k] = +o[k]; });
      ['core', 'spin', 'interactive'].forEach(function (k) { if (k in o) cfg[k] = !!o[k]; });
      wake();
    }

    /* ---- input ---- */
    function pointerToTouch(e) {
      var r = canvas.getBoundingClientRect(), k = canvas.width / Math.max(1, r.width);
      touchX = (e.clientX - r.left) * k; touchY = (r.bottom - e.clientY) * k;
    }
    function onWinMove(e) {
      if (!cfg.interactive) return;
      ptr.tx = e.clientX / window.innerWidth * 2 - 1; ptr.ty = e.clientY / window.innerHeight * 2 - 1;
      if (dragging) pointerToTouch(e);
      wake();
    }
    function onDown(e) {
      if (!cfg.interactive) return;
      dragging = true; lastPX = e.clientX; lastPY = e.clientY;
      try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
      pointerToTouch(e); glow = 1; press.target = 1.045; wake();
    }
    function onMove(e) {
      if (!dragging) return;
      vy = (e.clientX - lastPX) * 0.006; vx = (e.clientY - lastPY) * 0.006;
      oy += vy; ox += vx; lastPX = e.clientX; lastPY = e.clientY; wake();
    }
    function onUp() { dragging = false; press.target = 1; wake(); }
    window.addEventListener('pointermove', onWinMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.style.touchAction = 'none';

    /* ---- render loop ---- */
    function frame(now) {
      raf = 0;
      if (destroyed || !ready) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var rm = reduced.matches;

      resize();

      // shape morph
      if (morph < 1) { morph = Math.min(1, morph + dt / 0.75); if (morph >= 1) shapeA = shapeB; }
      var m = easeIO(morph);
      var SA = SHAPES[shapeA], SB = SHAPES[shapeB];

      // scene fade
      if (sceneT < 1) {
        sceneT = Math.min(1, sceneT + dt / 0.7);
        var se = easeIO(sceneT);
        Object.keys(cur).forEach(function (k) { lerpArr(cur[k], from[k], to[k], se); });
        mixCtx.globalAlpha = 1; mixCtx.drawImage(prev, 0, 0);
        mixCtx.globalAlpha = se; mixCtx.drawImage(wall, 0, 0); mixCtx.globalAlpha = 1;
        upload(sceneT >= 1 ? wall : mixed);
      } else if (wallDirty) { repaintWall(); upload(wall); }

      // rotation
      var rest = [lerp(SA.rest[0], SB.rest[0], m), lerp(SA.rest[1], SB.rest[1], m), lerp(SA.rest[2], SB.rest[2], m)];
      var spinX = lerp(SA.spin[0], SB.spin[0], m), spinY = lerp(SA.spin[1], SB.spin[1], m);
      var limit = SB.limit, t = rm ? 0 : now / 1000;
      if (!dragging) {
        vx *= 0.94; vy *= 0.94; ox += vx; oy += vy;
        if (cfg.spin && autoSpin && !rm) { ax += spinX * cfg.spinSpeed * dt; ay += spinY * cfg.spinSpeed * dt; }
        if (limit) { var k = 1 - Math.exp(-dt * 4); ox -= ox * k; oy -= oy * k; ax -= ax * k; ay -= ay * k; }
      }
      if (limit) { ox = clamp(ox, -limit, limit); oy = clamp(oy, -limit, limit); }
      var sway = limit && cfg.spin && autoSpin && !rm ? 1 : 0;
      var kp = 1 - Math.exp(-dt * 6);
      ptr.x += (ptr.tx - ptr.x) * kp; ptr.y += (ptr.ty - ptr.y) * kp;
      var pk = rm || !cfg.interactive ? 0 : 0.05;
      par.x += (ptr.y * pk - par.x) * kp; par.y += (ptr.x * pk - par.y) * kp;
      var rx = rest[0] + ax + ox + par.x + sway * Math.sin(t * 0.6) * 0.07;
      var ry = rest[1] + ay + oy + par.y + sway * Math.sin(t * 0.4 + 1.0) * 0.16;

      // light follows the pointer
      var L = cur.light, lx = L[0] + ptr.x * 0.45 + (rm ? 0 : Math.sin(t * 0.35) * 0.04), ly = L[1] - ptr.y * 0.3 + (rm ? 0 : Math.cos(t * 0.27) * 0.025);
      var lv = norm3([lx, ly, L[2]]);

      // press spring
      if (rm) { press.v = press.target; press.vel = 0; }
      else { var a = (press.target - press.v) * 260 - press.vel * 16; press.vel += a * dt; press.v += press.vel * dt; }
      glow = dragging ? Math.min(1, glow + dt * 4) * 0.985 + 0.015 * 0.7 : glow * Math.exp(-dt * 3.5);

      var intro = introMs ? Math.min(1, (now - started) / introMs) : 1; intro = easeOut(intro);

      // resolution: ramp up only during the intro, afterwards change it rarely (every resize looks like a flicker)
      if (++frames > 10) {
        slow = dt * 1000 > 28 ? slow + 1 : Math.max(0, slow - 2);
        var floorQ = softGL ? 0.3 : 0.55;
        if (slow > 14) { slow = 0; fast = 0; if (quality > floorQ) { quality = Math.max(floorQ, quality * 0.8); qCeil = quality; sizeKey = ''; } else autoSpin = false; }
        else if (intro < 1 && dt * 1000 < 24 && quality < qCeil && ++fast > 3) { fast = 0; quality = Math.min(qCeil, quality + 0.25); sizeKey = ''; }
        else if (intro >= 1 && quality < qCeil && !softGL) { quality = qCeil; sizeKey = ''; qCeil = quality; }
      }

      // uniforms
      gl.uniformMatrix3fv(loc.uRot, false, rotMatrix(rx, ry, rest[2]));
      gl.uniform3f(loc.uExt, lerp(SA.ext[0], SB.ext[0], m), lerp(SA.ext[1], SB.ext[1], m), lerp(SA.ext[2], SB.ext[2], m));
      u1('uRad', lerp(SA.rad, SB.rad, m)); u1('uTorus', lerp(SA.torus, SB.torus, m));
      u1('uRound', lerp(SA.round, SB.round, m)); u1('uRoundBend', cfg.roundBend); u1('uMagK', lerp(SA.mag, SB.mag, m));
      u1('uCore', cfg.core ? lerp(SA.core, SB.core, m) : 0);
      u3('uCoreCol', cur.core); u3('uAbsorb', cur.absorb); u3('uLight', lv);
      u3('uEnvLo', cur.lo); u3('uEnvHi', cur.hi); u3('uEnvFloor', cur.floor); u3('uSoftLo', cur.softLo); u3('uSoftHi', cur.softHi); u3('uFlagCol', cur.flag); u1('uBoost', cur.boost[0]);
      u1('uScale', press.v * (0.94 + 0.06 * intro));
      u1('uIor', 1 + (cfg.ior - 1) * intro); u1('uDisp', cfg.dispersion); u1('uWave', cfg.waviness); u1('uFlat', cfg.faceBend);
      u1('uMag', cfg.magnify * intro); u1('uGlow', glow); u1('uReveal', intro);
      gl.uniform2f(loc.uTouch, touchX, touchY);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      var animating = morph < 1 || sceneT < 1 || wallDirty || Math.abs(press.target - press.v) + Math.abs(press.vel) > 1e-4 || glow > 0.003 || intro < 1 ||
        Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 0.001 || Math.abs(vx) + Math.abs(vy) > 1e-4 || (limit && (Math.abs(ox) + Math.abs(oy) > 1e-3));
      var run = (!rm && cfg.spin && autoSpin) || (!rm && limit && autoSpin) || dragging || animating;
      if (visible && run && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function wake() { if (!raf && !destroyed) { last = performance.now(); raf = requestAnimationFrame(frame); } }

    var io = null;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(function (en) { visible = en[en.length - 1].isIntersecting; if (visible) wake(); });
      io.observe(canvas);
    }
    var ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { rectCache = null; wake(); }); ro.observe(canvas); }
    function onVis() { if (!document.hidden) wake(); }
    function onWinResize() { rectCache = null; sizeKey = ''; wake(); }
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onWinResize);
    if (reduced.addEventListener) reduced.addEventListener('change', wake);
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); destroyed = true; canvas.classList.add('lg-no-webgl'); });

    // free the GPU context right away when leaving the page, so the next page starts fast
    window.addEventListener('pagehide', function () { destroyed = true; var lc = gl.getExtension('WEBGL_lose_context'); if (lc) lc.loseContext(); });

    // let the page paint first: start compiling once the document has loaded and the browser is idle
    function startLater() { setTimeout(function () { if (!destroyed) beginCompile(); }, 60); }
    if (document.readyState === 'complete') startLater(); else window.addEventListener('load', startLater);

    return {
      webgl: true,
      set: set,
      setShape: setShape,
      setScene: setScene,
      getState: function () { return { shape: shapeB, scene: sceneKey, text: currentText(), ior: cfg.ior, dispersion: cfg.dispersion, magnify: cfg.magnify, core: cfg.core, spin: cfg.spin, spinSpeed: cfg.spinSpeed }; },
      on: function (name, fn) { (listeners[name] = listeners[name] || []).push(fn); },
      snapshot: function () { last = performance.now(); if (raf) { cancelAnimationFrame(raf); raf = 0; } frame(performance.now()); return canvas.toDataURL('image/png'); },
      destroy: function () {
        destroyed = true; if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onWinMove); window.removeEventListener('resize', onWinResize);
        document.removeEventListener('visibilitychange', onVis);
        canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointercancel', onUp);
        if (io) io.disconnect(); if (ro) ro.disconnect();
      }
    };
  }

  /* ------------------------------------------------------------------ *
   *  Declarative mode:  <canvas data-liquid-glass data-shape="ring" ...>
   * ------------------------------------------------------------------ */
  function fromAttributes(el) {
    var d = el.dataset, o = {};
    if (d.shape) o.shape = d.shape;
    if (d.scene) o.scene = d.scene;
    if (d.text !== undefined) o.text = d.text;
    if (d.hint !== undefined) o.hint = d.hint;
    ['ior', 'dispersion', 'magnify', 'spinSpeed'].forEach(function (k) { if (d[k] !== undefined) o[k] = parseFloat(d[k]); });
    ['core', 'spin', 'interactive'].forEach(function (k) { if (d[k] !== undefined) o[k] = d[k] !== 'false'; });
    return o;
  }
  function autoInit() {
    var list = document.querySelectorAll('canvas[data-liquid-glass]');
    for (var i = 0; i < list.length; i++) {
      if (list[i].__lgc) continue;
      list[i].__lgc = 'pending';
      (function (el, n) {
        setTimeout(function () {   // one canvas per task so the page stays responsive
          try { el.__lgc = create(el, fromAttributes(el)); } catch (e) { el.classList.add('lg-no-webgl'); if (global.console) console.warn(e); }
        }, n * 40);
      })(list[i], i);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit); else autoInit();

  global.LiquidGlassCube = {
    version: '2.0.0',
    create: create,
    shapes: SHAPES,
    scenes: SCENES,
    defaults: DEFAULTS,
    init: autoInit
  };
})(window);
