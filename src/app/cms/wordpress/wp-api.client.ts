import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { WP_ENDPOINTS } from './wp-endpoints';
import { API_CONFIG_TOKEN } from '../../core/config/injection-token';
import { DEFAULT_CONTENT_LANG, SUPPORTED_LOCALES } from '../../core/config/locales.config';

export interface WpRenderedField {
  rendered: string;
}

export interface WpAcf {
  region?: string;
  featured?: boolean;
  gallery?: string[];
}

export interface WpPost {
  id: number;
  slug: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  featured_media: number;
  lang?: string;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

export interface WpDestination {
  id: number;
  slug: string;
  title: WpRenderedField;
  excerpt: WpRenderedField;
  content: WpRenderedField;
  featured_media: number;
  acf: WpAcf;
  lang?: string;
}

export interface WpPage {
  id: number;
  slug: string;
  title: WpRenderedField;
  excerpt: WpRenderedField;
  content: WpRenderedField;
  featured_media?: number;
  date?: string;
  template?: string;
  lang?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordpressApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);
  private readonly locale = inject(LOCALE_ID);

  /** CMS language code (Polylang `lang` parameter) for the active locale. */
  private readonly lang =
    SUPPORTED_LOCALES.find((l) => l.code === this.locale)?.lang ?? DEFAULT_CONTENT_LANG;

  getPosts(): Observable<WpPost[]> {
    return this.getContent<WpPost>(WP_ENDPOINTS.posts);
  }

  getPostBySlug(slug: string): Observable<WpPost[]> {
    return this.getContent<WpPost>(WP_ENDPOINTS.posts, { slug });
  }

  getDestinationBySlug(slug: string): Observable<WpDestination[]> {
    return this.getContent<WpDestination>(WP_ENDPOINTS.destinations, { slug });
  }

  getDestinations(): Observable<WpDestination[]> {
    return this.getContent<WpDestination>(WP_ENDPOINTS.destinations);
  }

  getPageBySlug(slug: string): Observable<WpPage[]> {
    return this.getContent<WpPage>(WP_ENDPOINTS.pages, { slug });
  }

  getPageByTemplate(template: string): Observable<WpPage[]> {
    return this.getContent<WpPage>(WP_ENDPOINTS.pages, { template });
  }

  getPage(): Observable<WpPage[]> {
    return this.getContent<WpPage>(WP_ENDPOINTS.pages);
  }

  getMediaById(id: number): Observable<WpMedia> {
    return this.http.get<WpMedia>(`${this.config.wordpressApiBaseUrl}${WP_ENDPOINTS.media}/${id}`);
  }

  /**
   * Fetches translatable content in the active language. When nothing is
   * returned, falls back once to the default language (lists and details alike).
   */
  private getContent<T>(endpoint: string, filters: Record<string, string> = {}): Observable<T[]> {
    const request = (lang: string) =>
      this.http.get<T[]>(`${this.config.wordpressApiBaseUrl}${endpoint}`, {
        params: new HttpParams({ fromObject: { ...filters, lang } }),
      });

    return request(this.lang).pipe(
      switchMap((items) =>
        items.length > 0 || this.lang === DEFAULT_CONTENT_LANG
          ? of(items)
          : request(DEFAULT_CONTENT_LANG),
      ),
    );
  }
}
