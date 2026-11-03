import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SITE_CONFIG } from '../../core/config/site.config';
import {
  buildRobotsTxt,
  buildSitemapXml,
  collectSitemapEntries,
  getSitemapXml,
  resetSitemapCache,
  type FetchLike,
} from './wp-sitemap';

const API = 'http://wp/api';

function fakeFetch(): ReturnType<typeof vi.fn<FetchLike>> {
  const data: Record<string, unknown[]> = {
    [`${API}/destinations`]: [{ slug: 'taipei' }],
    [`${API}/posts`]: [{ slug: 'a&b', modified: '2025-01-02T00:00:00' }, { id: 1 }],
    [`${API}/pages`]: [{ slug: 'about-taiwan' }],
  };
  return vi.fn<FetchLike>(async (url) => ({ ok: url in data, json: async () => data[url] }));
}

describe('wp-sitemap', () => {
  beforeEach(() => resetSitemapCache());

  it('builds robots.txt pointing at the sitemap', () => {
    const txt = buildRobotsTxt();
    expect(txt).toContain('User-agent: *');
    expect(txt).toContain('Allow: /');
    expect(txt).toContain(`Sitemap: ${SITE_CONFIG.site_url}/sitemap.xml`);
  });

  it('collects static pages and WordPress content, skipping items without slug', async () => {
    const paths = (await collectSitemapEntries(API, fakeFetch())).map((e) => e.path);
    expect(paths).toEqual([
      '/home',
      '/destinations',
      '/blog',
      '/contact',
      '/destinations/taipei',
      '/blog/a%26b',
      '/practical-info/about-taiwan',
    ]);
  });

  it('rejects when the WordPress API fails', async () => {
    const failing: FetchLike = async () => ({ ok: false, json: async () => [] });
    await expect(collectSitemapEntries(API, failing)).rejects.toThrow();
  });

  it('builds valid XML with absolute URLs, alternates per locale and escaping', () => {
    const xml = buildSitemapXml([{ path: '/blog/a%26b', lastmod: '2025-01-02&x' }]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    for (const locale of SITE_CONFIG.locales) {
      expect(xml).toContain(`<loc>${SITE_CONFIG.site_url}/${locale}/blog/a%26b</loc>`);
      expect(xml).toContain(
        `hreflang="${locale}" href="${SITE_CONFIG.site_url}/${locale}/blog/a%26b"`,
      );
    }
    expect(xml).toContain(`hreflang="x-default" href="${SITE_CONFIG.site_url}/en-US/blog/a%26b"`);
    expect(xml).toContain('<lastmod>2025-01-02&amp;x</lastmod>');
    expect(xml.match(/<url>/g)?.length).toBe(SITE_CONFIG.locales.length);
  });

  it('escapes ampersands in URLs', () => {
    expect(buildSitemapXml([{ path: '/a?x=1&y=2' }])).toContain('/a?x=1&amp;y=2');
  });

  it('caches the sitemap between calls until the TTL expires', async () => {
    const f = fakeFetch();
    await getSitemapXml(API, f, 1000);
    await getSitemapXml(API, f, 2000);
    expect(f).toHaveBeenCalledTimes(3);
    await getSitemapXml(API, f, 1000 + 6 * 60 * 1000);
    expect(f).toHaveBeenCalledTimes(6);
  });
});
