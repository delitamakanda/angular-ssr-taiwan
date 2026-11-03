import { DOCUMENT, inject, Injectable, LOCALE_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo.model';
import { localizedUrl, SITE_CONFIG } from '../config/site.config';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(LOCALE_ID);

  update(data: SeoData): void {
    const url = data.path !== undefined ? localizedUrl(this.locale, data.path) : undefined;

    this.title.setTitle(data.title);

    // Legacy tags were emitted with name="og:*" (ignored by crawlers): drop them.
    ['title', 'description', 'image', 'url', 'type'].forEach((key) =>
      this.meta.removeTag(`name="og:${key}"`),
    );

    this.setTag('name', 'description', data.description);
    this.setTag('property', 'og:title', data.title);
    this.setTag('property', 'og:description', data.description);
    this.setTag('property', 'og:image', data.image);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:type', data.type === 'article' ? 'article' : 'website');
    this.setTag('name', 'twitter:card', data.image ? 'summary_large_image' : 'summary');
    this.setTag('name', 'twitter:title', data.title);
    this.setTag('name', 'twitter:description', data.description);
    this.setTag('name', 'twitter:image', data.image);
    this.setTag('name', 'robots', data.noindex ? 'noindex' : undefined);

    this.setCanonicalUrl(url);
    this.setAlternates(data.path);
  }

  private setTag(attr: 'name' | 'property', key: string, content: string | undefined): void {
    const selector = `${attr}="${key}"`;
    if (content) {
      this.meta.updateTag({ [attr]: key, content }, selector);
    } else {
      this.meta.removeTag(selector);
    }
  }

  private setCanonicalUrl(url: string | undefined): void {
    this.document.head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    if (!url) {
      return;
    }
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    this.document.head.appendChild(link);
  }

  private setAlternates(path: string | undefined): void {
    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    if (path === undefined) {
      return;
    }
    const add = (hreflang: string, href: string) => {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', hreflang);
      link.href = href;
      this.document.head.appendChild(link);
    };
    SITE_CONFIG.locales.forEach((code) => add(code, localizedUrl(code, path)));
    add('x-default', localizedUrl(SITE_CONFIG.default_locale, path));
  }
}
