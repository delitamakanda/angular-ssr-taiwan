import { SUPPORTED_LOCALES } from './locales.config';

export const SITE_CONFIG = {
  site_name: 'Taiwan Travel Guide',
  site_url: 'https://angular-ssr-taiwan-946790860424.europe-west9.run.app',
  // Each locale is served under `<site_url>/<locale>/…` (one bundle per locale).
  locales: SUPPORTED_LOCALES.map((l) => l.code),
  default_locale: 'en-US',
};

/** Absolute URL of `path` (no locale prefix) in the given locale. */
export function localizedUrl(locale: string, path: string): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.site_url}/${locale}${clean}`;
}
