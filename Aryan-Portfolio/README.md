# Aryan Virat Portfolio

Static HTML portfolio with React/TypeScript islands for the supplied Contribution Skyline and adapted FullScreenScrollFX. Existing content and assets remain in dist.

## Setup and build
npm install
npm run typecheck
npm run build

Preview locally with `python -m http.server 8000 --directory dist`.

## Components
Reusable React components are in components/ui, with @/* mapped to the root. Tailwind utilities are generated from src/widgets.css without applying a global reset. components.json provides shadcn-compatible paths. No shadcn runtime components are required.

The supplied scroll component was adapted to remove conflicting sticky/pin logic, inaccurate document offsets, lost fast-scroll updates, inaccessible div controls, and untracked delayed callbacks. It uses scoped GSAP animation, native buttons, and a mobile/reduced-motion layout without pinning.

## GitHub activity
src/contributions.json is a dated snapshot from the public GitHub contributions page for virat991v, not live activity. Refresh by downloading https://github.com/users/virat991v/contributions and running `python scripts/import-contributions.py /absolute/path/to/downloaded.html`, then rebuilding. Import fails if data is incomplete. Production always supplies verified data; omitted data no longer generates demo contributions.

## Accessibility
Project buttons, previous/next, skip-showcase link, 2D/3D toggle, keyboard canvas controls and reduced-motion support are included. Browser QA was unavailable in the managed execution environment; TypeScript, production bundling, contribution aggregation and asset/anchor checks were performed.

## Spotlight cards and video hero

`components/ui/spotlight-card.tsx` exports `GlowCard`. The About section supplies three real text cards with `customSize` and `glowColor="orange"`. Pointer coordinates are local to each card; touch scrolling is preserved. Children are required. The component needs React only.

`components/ui/scroll-locked-video-hero.tsx` exports `MetroHero`. Its scroll-scrubbed video sits immediately before the selected projects; it uses native scrolling with a sticky stage, and provides a Skip to projects link. Mobile and reduced-motion visitors see a static portrait. A video error also falls back to the portrait. The default footage is the remote CDN URL from the supplied component; replace `videoSrc` with a local licensed video for complete asset ownership.

Both components mount in `src/main.tsx`; styles are in `src/widgets.css`. React, TypeScript, Tailwind CSS and shadcn-compatible aliases are already configured. `components/ui` is the shared reusable component directory, allowing imports such as `@/components/ui/spotlight-card`. No extra provider, state library, icon package, or stock photo is needed; the portfolio keeps the supplied personal photo and project screenshots.

Deployment uses `vercel.json` (Other preset, `npm ci`, typecheck/build, output `dist`). Parent-folder configuration supports deploying the entire GitHub repository too.
