# Aryan Virat — portfolio

Personal software development portfolio. The application lives in `Aryan-Portfolio/`.

## Publish on Vercel

Import `virat991v/portfolio` and deploy the `main` branch. Keep Root Directory empty (repository root); the root `vercel.json` supplies the install/build commands and output folder. If your existing project already uses Root Directory `Aryan-Portfolio`, the configuration inside that folder supports it too.

Framework preset: **Other**. Remove conflicting dashboard overrides so Vercel uses the checked-in configuration. Node.js 22 is recommended.

After a successful deployment, open the production domain shown by Vercel. If visitors are redirected to a Vercel login page, check Settings → Deployment Protection and ensure the production portfolio is publicly accessible. Use the production domain, not an old preview URL.

## Develop locally

```sh
cd Aryan-Portfolio
npm ci
npm run typecheck
npm run build
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. Rebuild after editing React or Tailwind source.

See `Aryan-Portfolio/README.md` for component details.
