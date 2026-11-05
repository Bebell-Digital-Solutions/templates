/* ==========================================================================
   Animaciones de scroll SOLO con CSS
   --------------------------------------------------------------------------
   Estructura:
     1. Fuentes y tokens
     2. Base y utilidades
     3. Layout estático (lo que ve todo el mundo)
     4. Animaciones ligadas al scroll (solo si hay soporte y el usuario
        no ha pedido reducir el movimiento)
     5. Aviso para navegadores sin soporte

   Principio clave: MEJORA PROGRESIVA.
   La página funciona y se lee bien sin animaciones; el movimiento es una
   capa extra que solo se activa cuando el navegador lo soporta y el
   usuario no tiene activado "reducir movimiento".
   ========================================================================== */


/* 1. Fuentes y tokens
   ========================================================================== */

:root {
  /* Colores */
  --color-bg: #0b0d12;
  --color-surface: #12151d;
  --color-ink: #f3f1ec;
  --color-ink-soft: #b9bcc6;
  --color-muted: #8a8f9c;
  --color-line: #22262f;
  --color-lime: #c6ff3d;
  --color-violet: #7c5cff;
  --color-coral: #ff6b4a;

  /* Tipografía */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Layout */
  --content-max: 40rem;
  --gutter: clamp(1.25rem, 5vw, 2rem);
  --radius-lg: 1.375rem;
  --radius-sm: 0.375rem;
}


/* 2. Base y utilidades
   ========================================================================== */

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-ink);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: clip; /* evita scroll lateral por los orbes del hero */
}

h1, h2, h3, p, ol, ul, pre {
  margin: 0;
}

ol, ul {
  padding: 0;
  list-style: none;
}

em {
  font-style: normal;
}

/* Etiqueta de código reutilizable */
.tag {
  display: inline-block;
  padding: 0.3rem 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-lime);
  background: #141a06;
  border: 1px solid #3a4a12;
  border-radius: var(--radius-sm);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}


/* 3. Layout estático
   ========================================================================== */

/* Barra de progreso: oculta por defecto, solo tiene sentido animada */
.progress {
  display: none;
}

/* --- Hero --- */
.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: 0 var(--gutter);
  text-align: center;
}

.eyebrow {
  margin-bottom: 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.hero__title {
  font-size: clamp(2.75rem, 11vw, 4.5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.045em;
}

.hero__title em {
  color: var(--color-lime);
}

.hero__lead {
  margin-top: 1.4rem;
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--color-muted);
}

.hero__lead strong {
  font-weight: 600;
  color: var(--color-ink);
}

.hero__hint {
  position: absolute;
  bottom: 2rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* Orbes decorativos de fondo */
.orb {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.55;
}

.orb--violet {
  top: -4rem;
  left: -5rem;
  width: 16rem;
  aspect-ratio: 1;
  background: var(--color-violet);
}

.orb--coral {
  right: -4.5rem;
  bottom: -2.5rem;
  width: 14rem;
  aspect-ratio: 1;
  background: var(--color-coral);
}

/* --- Texto palabra a palabra --- */
.reveal__sticky {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.4rem;
  max-width: var(--content-max);
  margin-inline: auto;
  padding: 6rem var(--gutter);
}

.reveal__text {
  font-size: clamp(2rem, 7vw, 3rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.word {
  display: inline-block;
}

.word--accent {
  color: var(--color-lime);
}

/* --- Tarjetas --- */
.stack {
  max-width: var(--content-max);
  margin-inline: auto;
  padding: 2.5rem var(--gutter) 7rem;
}

.stack__list {
  display: grid;
  gap: 1.4rem;
  margin-top: 1rem;
}

.card {
  position: relative;
  padding: 1.6rem 1.5rem 1.5rem;
  background: linear-gradient(160deg, #151922, #0e1117);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
}

.card--new {
  background: linear-gradient(160deg, #192009, #0e1117);
  border-color: #3d4a16;
}

.card__num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
}

.card__title {
  margin: 0.75rem 0 0.6rem;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.card p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-ink-soft);
}

.badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-bg);
  background: var(--color-lime);
  border-radius: 999px;
}

/* --- Scroll horizontal ---
   Sin animación es un carrusel normal con scroll lateral y snap. */
.horizontal__sticky {
  container-type: inline-size; /* habilita las unidades cqi para la pista */
  padding: 4rem 0;
}

.horizontal__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 0 var(--gutter) 1.4rem;
}

.horizontal__title {
  font-size: clamp(1.9rem, 6.5vw, 2.6rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.horizontal__title em {
  color: var(--color-violet);
}

.track {
  display: flex;
  gap: 1.1rem;
  padding: 0 var(--gutter);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.panel {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: min(24rem, 80cqi);
  min-height: 18.75rem;
  padding: 1.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  scroll-snap-align: start;
}

.panel__step {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  opacity: 0.75;
}

.panel__title {
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.035em;
}

.panel pre {
  padding: 0.9rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.6;
  background: rgb(0 0 0 / 0.28);
  border-radius: 0.75rem;
}

.panel--violet { background: #1a1440; }
.panel--coral  { background: #2a1209; }
.panel--lime   { background: #131a07; }
.panel--sky    { background: #111827; }

.panel--violet .panel__title { color: #b4a3ff; }
.panel--coral  .panel__title { color: #ffab95; }
.panel--lime   .panel__title { color: var(--color-lime); }
.panel--sky    .panel__title { color: #9fd3ff; }

.horizontal__bar {
  display: none; /* solo se muestra cuando está animada */
}

/* --- Cierre --- */
.outro {
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: 0 var(--gutter);
  text-align: center;
}

.outro__title {
  font-size: clamp(2.5rem, 9vw, 3.5rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.045em;
}

.outro__title em {
  color: var(--color-lime);
}

.outro__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.6rem;
}

.outro__note {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-muted);
}


/* 4. Animaciones ligadas al scroll
   --------------------------------------------------------------------------
   Doble condición:
     - @supports: el navegador entiende animation-timeline.
     - prefers-reduced-motion: no-preference: el usuario no ha pedido
       reducir el movimiento (accesibilidad, mareos, trastornos vestibulares).

   Nota: el shorthand `animation` reinicia `animation-timeline`, así que
   este siempre se declara DESPUÉS del shorthand.
   ========================================================================== */

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {

    /* --- Barra de progreso de toda la página: scroll(root) --- */
    .progress {
      display: block;
      position: fixed;
      inset: 0 0 auto;
      z-index: 10;
      height: 5px;
      background: var(--color-lime);
      transform-origin: left;
      animation: grow-x linear both;
      animation-timeline: scroll(root);
    }

    /* --- Hero: se encoge y desenfoca en los primeros 520px de scroll --- */
    .hero__content {
      animation: hero-out linear both;
      animation-timeline: scroll(root);
      animation-range: 0 520px;
    }

    /* Parallax de los orbes en los primeros 700px */
    .orb {
      animation: drift-violet linear both;
      animation-timeline: scroll(root);
      animation-range: 0 700px;
    }

    .orb--coral {
      animation-name: drift-coral;
    }

    /* --- Texto palabra a palabra ---
       La sección es alta (230svh) y su contenido se queda fijo (sticky).
       Todas las palabras comparten el timeline --words, pero cada una se
       anima en un tramo distinto gracias a su índice --i. */
    .reveal {
      height: 230svh;
      view-timeline: --words block;
    }

    .reveal__sticky {
      position: sticky;
      top: 0;
      justify-content: center;
      height: 100svh;
      padding-block: 0;
    }

    .word {
      opacity: 0.12;
      animation: light-up linear both;
      animation-timeline: --words;
      animation-range:
        contain calc(var(--i) * 6.5%)
        contain calc(var(--i) * 6.5% + 14%);
    }

    /* --- Tarjetas: entran al aparecer en pantalla con view() --- */
    .card {
      transform-origin: 50% 100%;
      animation: rise linear both;
      animation-timeline: view();
      animation-range: entry 5% cover 38%;
    }

    /* --- Scroll horizontal fijado ---
       La sección mide 320svh; mientras se recorre, el contenido queda fijo
       y la pista se desplaza en horizontal. El rango `contain` cubre
       justo el tramo en que la sección ocupa toda la pantalla. */
    .horizontal {
      height: 320svh;
      view-timeline: --hz block;
    }

    .horizontal__sticky {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100svh;
      padding: 0;
      overflow: hidden;
    }

    .track {
      width: max-content;
      overflow: visible;
      animation: slide-track linear both;
      animation-timeline: --hz;
      animation-range: contain 0% contain 100%;
    }

    .horizontal__bar {
      display: block;
      height: 3px;
      margin: 1.6rem var(--gutter) 0;
      overflow: hidden;
      background: var(--color-line);
      border-radius: 3px;
    }

    .horizontal__bar span {
      display: block;
      height: 100%;
      background: var(--color-violet);
      transform-origin: left;
      animation: grow-x linear both;
      animation-timeline: --hz;
      animation-range: contain 0% contain 100%;
    }

    /* --- Cierre --- */
    .outro__content {
      animation: zoom-in linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 50%;
    }
  }
}

/* Keyframes
   Solo se animan transform, opacity y filter: propiedades que el navegador
   puede componer sin recalcular el layout. */

@keyframes grow-x {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes hero-out {
  to {
    opacity: 0;
    transform: translateY(-60px) scale(0.72);
    filter: blur(6px);
  }
}

@keyframes drift-violet {
  to { transform: translate(120px, 260px) scale(1.4); }
}

@keyframes drift-coral {
  to { transform: translate(-140px, -300px) scale(1.3); }
}

@keyframes light-up {
  to { opacity: 1; }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(110px) rotateX(28deg) scale(0.86);
  }
}

@keyframes slide-track {
  /* Desplaza la pista hasta que su borde derecho llega al del contenedor.
     100cqi = ancho del contenedor (.horizontal__sticky). */
  to { transform: translateX(calc(-100% + 100cqi)); }
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(8px);
  }
}


/* 5. Aviso para navegadores sin soporte
   ========================================================================== */

.notice {
  display: none;
}

@supports not (animation-timeline: scroll()) {
  .notice {
    display: block;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0.75rem var(--gutter);
    font-size: 0.85rem;
    text-align: center;
    color: var(--color-bg);
    background: var(--color-lime);
  }

  .notice code {
    font-family: var(--font-mono);
  }
}
