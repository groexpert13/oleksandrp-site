# Feature Showcase

This project is a Next.js application demonstrating various features and tools. It uses TypeScript and Tailwind CSS.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

To check code style run:

```bash
npm run lint
npm run lint:fix
```

## Production Build

To create a production build run:

```bash
npm run build
```

If the build process fails because external fonts are not accessible, remove the
Google font import in `app/layout.tsx` or provide the font files locally.

## Slide cleanup on the Hobby plan

Vercel Cron Jobs are not available on the free plan, so the automatic removal of
expired slide uploads is handled via a scheduled GitHub Action instead. The
workflow in `.github/workflows/cleanup.yml` calls the `/api/cron/cleanup-expired-slides`
route every hour.

Add two secrets in your repository settings:

1. `VERCEL_URL` – the base URL of your deployed app (e.g. `https://example.vercel.app`).
2. `CRON_SECRET` – same value as the `CRON_SECRET` env variable configured in Vercel.

With these secrets in place the scheduled action will trigger the cleanup route
and keep your storage tidy without relying on Vercel Cron Jobs.
