import { SITE_CONFIG } from '../../core/config/site.config';
import { WP_ENDPOINTS } from './wp-endpoints';

export interface SitemapEntry {
  /** Path without locale prefix, e.g. `/blog/my-post`. */
  path: string;
  lastmod?: string;
}

interface WpSluggedItem {
  slug?: string;
  modified?: string;
}

export type FetchLike = (url: string) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

const STATIC_PATHS = ['/home', '/destinations', '/blog', '/contact'];

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function url(locale: string, path: string): string {
  return `${SITE_CONFIG.site_url}/${locale}${path}`;
}

export function buildRobotsTxt(siteUrl: string = SITE_CONFIG.site_url): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const alternates = [
        ...SITE_CONFIG.locales.map((l) => [l, url(l, entry.path)] as const),
        ['x-default', url(SITE_CONFIG.default_locale, entry.path)] as const,
      ]
        .map(
          ([lang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}"/>`,
        )
        .join('\n');
      const lastmod = entry.lastmod ? `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n` : '';
      // One <url> per locale, each listing all alternates (sitemaps protocol for hreflang).
      return SITE_CONFIG.locales
        .map(
          (locale) =>
            `  <url>\n    <loc>${escapeXml(url(locale, entry.path))}</loc>\n${lastmod}${alternates}\n  </url>`,
        )
        .join('\n');
    })
    .join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${urls}\n</urlset>\n`
  );
}

async function fetchItems(
  fetchFn: FetchLike,
  apiUrl: string,
  endpoint: string,
): Promise<WpSluggedItem[]> {
  const response = await fetchFn(`${apiUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`WordPress API error on ${endpoint}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? (data as WpSluggedItem[]) : [];
}

function toEntries(items: WpSluggedItem[], prefix: string): SitemapEntry[] {
  return items
    .filter((item): item is WpSluggedItem & { slug: string } => !!item.slug)
    .map((item) => ({
      path: `${prefix}/${encodeURIComponent(item.slug)}`,
      lastmod: item.modified,
    }));
}

/** Collects every public page (static routes + WordPress content) as sitemap entries. */
export async function collectSitemapEntries(
  apiUrl: string,
  fetchFn: FetchLike = fetch as unknown as FetchLike,
): Promise<SitemapEntry[]> {
  const [destinations, posts, pages] = await Promise.all([
    fetchItems(fetchFn, apiUrl, WP_ENDPOINTS.destinations),
    fetchItems(fetchFn, apiUrl, WP_ENDPOINTS.posts),
    fetchItems(fetchFn, apiUrl, WP_ENDPOINTS.pages),
  ]);
  return [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...toEntries(destinations, '/destinations'),
    ...toEntries(posts, '/blog'),
    ...toEntries(pages, '/practical-info'),
  ];
}

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { xml: string; expires: number } | null = null;

/** Sitemap XML, cached for a few minutes to spare the WordPress API. */
export async function getSitemapXml(
  apiUrl: string,
  fetchFn?: FetchLike,
  now: number = Date.now(),
): Promise<string> {
  if (cache && cache.expires > now) {
    return cache.xml;
  }
  const xml = buildSitemapXml(await collectSitemapEntries(apiUrl, fetchFn));
  cache = { xml, expires: now + CACHE_TTL_MS };
  return xml;
}

export function resetSitemapCache(): void {
  cache = null;
}
