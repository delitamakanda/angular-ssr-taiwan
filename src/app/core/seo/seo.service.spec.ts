import { DOCUMENT, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SITE_CONFIG } from '../config/site.config';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let doc: Document;

  const meta = (selector: string) => doc.head.querySelectorAll(`meta[${selector}]`);
  const content = (selector: string) => meta(selector)[0]?.getAttribute('content');

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] });
    service = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
    doc.head.innerHTML = '';
  });

  it('uses property for og:* tags and removes legacy name="og:*" tags', () => {
    doc.head.innerHTML = '<meta name="og:title" content="old">';
    service.update({ title: 'T', description: 'D', image: 'https://img/x.png', path: '/blog' });

    expect(content('property="og:title"')).toBe('T');
    expect(content('property="og:description"')).toBe('D');
    expect(content('property="og:image"')).toBe('https://img/x.png');
    expect(content('property="og:url"')).toBe(`${SITE_CONFIG.site_url}/fr-FR/blog`);
    expect(content('property="og:type"')).toBe('website');
    expect(meta('name="og:title"').length).toBe(0);
    expect(content('name="description"')).toBe('D');
  });

  it('uses og:type article for articles', () => {
    service.update({ title: 'T', type: 'article' });
    expect(content('property="og:type"')).toBe('article');
  });

  it('picks twitter:card from the presence of an image', () => {
    service.update({ title: 'T', image: 'https://img/x.png' });
    expect(content('name="twitter:card"')).toBe('summary_large_image');
    expect(content('name="twitter:image"')).toBe('https://img/x.png');

    service.update({ title: 'T' });
    expect(content('name="twitter:card"')).toBe('summary');
    expect(meta('name="twitter:image"').length).toBe(0);
    expect(content('name="twitter:title"')).toBe('T');
  });

  it('never emits tags with an empty content', () => {
    service.update({ title: 'T', description: '', image: '' });
    const empty = Array.from(doc.head.querySelectorAll('meta')).filter(
      (m) => !m.getAttribute('content'),
    );
    expect(empty.length).toBe(0);
    expect(meta('property="og:image"').length).toBe(0);
    expect(meta('property="og:description"').length).toBe(0);
  });

  it('keeps a single canonical link across navigations', () => {
    service.update({ title: 'A', path: '/blog' });
    service.update({ title: 'B', path: '/contact' });
    const links = doc.head.querySelectorAll('link[rel="canonical"]');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe(`${SITE_CONFIG.site_url}/fr-FR/contact`);
  });

  it('emits hreflang links for each locale plus x-default, without duplicates', () => {
    service.update({ title: 'A', path: '/blog/x' });
    service.update({ title: 'B', path: '/blog/y' });

    const links = Array.from(doc.head.querySelectorAll('link[rel="alternate"][hreflang]'));
    const map = Object.fromEntries(
      links.map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]),
    );
    expect(links.length).toBe(4);
    expect(map).toEqual({
      'en-US': `${SITE_CONFIG.site_url}/en-US/blog/y`,
      'fr-FR': `${SITE_CONFIG.site_url}/fr-FR/blog/y`,
      'zh-TW': `${SITE_CONFIG.site_url}/zh-TW/blog/y`,
      'x-default': `${SITE_CONFIG.site_url}/en-US/blog/y`,
    });
  });

  it('omits canonical and hreflang without a path', () => {
    service.update({ title: 'A', path: '/blog' });
    service.update({ title: 'B' });
    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(0);
    expect(doc.head.querySelectorAll('link[rel="alternate"]').length).toBe(0);
  });

  it('adds noindex then removes it on the next page', () => {
    service.update({ title: 'A', noindex: true });
    expect(content('name="robots"')).toBe('noindex');
    service.update({ title: 'B' });
    expect(meta('name="robots"').length).toBe(0);
  });
});
