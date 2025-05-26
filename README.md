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
