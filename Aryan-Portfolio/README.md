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
