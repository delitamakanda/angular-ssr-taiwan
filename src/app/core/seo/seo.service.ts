import { DOCUMENT, Inject, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  update(data: SeoData): void {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'og:title', content: data.title });
    this.meta.updateTag({ name: 'og:description', content: data.description ?? '' });
    this.meta.updateTag({ name: 'og:image', content: data.image ?? '' });
    this.meta.updateTag({ name: 'og:url', content: data.canonical_url ?? '' });
    this.meta.updateTag({ name: 'og:type', content: data.type || 'page' });
    this.document.title = data.title;
    this.setCanonicalUrl(data.canonical_url?? '');
  }

  private setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
