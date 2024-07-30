import es from './content/es.json';

// https://next-intl-docs.vercel.app/docs/workflows/typescript
// next-intl integrates with TypeScript out-of-the box without additional setup.

type Messages = typeof es;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
