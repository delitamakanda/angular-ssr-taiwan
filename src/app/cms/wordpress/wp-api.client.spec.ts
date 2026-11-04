import { LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { API_CONFIG_TOKEN } from '../../core/config/injection-token';
import { WordpressApiClient } from './wp-api.client';

const BASE = 'http://wp.test/wp-json/wp/v2';

function setup(locale: string) {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: LOCALE_ID, useValue: locale },
      { provide: API_CONFIG_TOKEN, useValue: { wordpressApiBaseUrl: BASE } },
    ],
  });
  return {
    client: TestBed.inject(WordpressApiClient),
    http: TestBed.inject(HttpTestingController),
  };
}

describe('WordpressApiClient', () => {
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it.each([
    ['en-US', 'en'],
    ['fr-FR', 'fr'],
    ['zh-TW', 'zh-TW'],
  ])('adds lang for locale %s to posts, destinations and pages', (locale, lang) => {
    const { client, http } = setup(locale);

    client.getPosts().subscribe();
    client.getDestinations().subscribe();
    client.getPage().subscribe();

    for (const path of ['/posts', '/destinations', '/pages']) {
      const req = http.expectOne((r) => r.url === `${BASE}${path}`);
      expect(req.request.params.get('lang')).toBe(lang);
      req.flush([{ id: 1 }]);
    }
  });

  it('does not add lang to media requests', () => {
    const { client, http } = setup('en-US');

    client.getMediaById(7).subscribe();

    const req = http.expectOne(`${BASE}/media/7`);
    expect(req.request.params.has('lang')).toBe(false);
    req.flush({ id: 7 });
  });

  it('encodes slug and template alongside lang', () => {
    const { client, http } = setup('zh-TW');

    client.getPostBySlug('a b&c').subscribe();
    client.getPageByTemplate('practical-info').subscribe();

    const post = http.expectOne((r) => r.url === `${BASE}/posts`);
    expect(post.request.urlWithParams).toBe(`${BASE}/posts?slug=a%20b%26c&lang=zh-TW`);
    post.flush([{ id: 1 }]);

    const page = http.expectOne((r) => r.url === `${BASE}/pages`);
    expect(page.request.urlWithParams).toBe(`${BASE}/pages?template=practical-info&lang=zh-TW`);
    page.flush([{ id: 1 }]);
  });

  it('falls back to French when the translation is missing', () => {
    const { client, http } = setup('en-US');
    let result: unknown[] | undefined;

    client.getDestinationBySlug('taipei').subscribe((items) => (result = items));

    http.expectOne((r) => r.params.get('lang') === 'en').flush([]);
    http.expectOne((r) => r.params.get('lang') === 'fr').flush([{ id: 10 }]);

    expect(result).toEqual([{ id: 10 }]);
  });

  it('does not retry when French itself is empty', () => {
    const { client, http } = setup('fr-FR');
    let result: unknown[] | undefined;

    client.getPosts().subscribe((items) => (result = items));

    http.expectOne((r) => r.params.get('lang') === 'fr').flush([]);

    expect(result).toEqual([]);
  });

  it('falls back to French when the locale is unknown', () => {
    const { client, http } = setup('de-DE');

    client.getPosts().subscribe();

    http.expectOne((r) => r.params.get('lang') === 'fr').flush([]);
  });
});
