import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WP_ENDPOINTS } from './wp-endpoints';
import { environment } from '../../../environments/environment';

export interface WpRenderedField {
  rendered: string;
}

export interface WpAcf {
  region: string;
  featured: boolean;
  gallery: string[];
}

export interface WpPost {
  id: number;
  slug: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  featured_media: number;
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
}

@Injectable({
  providedIn: 'root',
})
export class WordpressApiClient {
  private readonly http = inject(HttpClient);
  private readonly wpApiUrl = environment.wordpressApiUrl;

  getPosts(): Observable<WpPost[]> {
    return this.http.get<WpPost[]>(`${this.wpApiUrl}${WP_ENDPOINTS.posts}`);
  }

  getPostBySlug(slug: string): Observable<WpPost> {
    return this.http.get<WpPost>(`${this.wpApiUrl}${WP_ENDPOINTS.posts}?slug=${encodeURIComponent(slug)}`);
  }

  getDestinationBySlug(slug: string): Observable<WpDestination> {
    return this.http.get<WpDestination>(
      `${this.wpApiUrl}${WP_ENDPOINTS.destinations}?slug=${encodeURIComponent(slug)}`,
    );
  }

  getDestinations(): Observable<WpDestination[]> {
    return this.http.get<WpDestination[]>(`${this.wpApiUrl}${WP_ENDPOINTS.destinations}`);
  }

  getMediaById(id: number): Observable<WpMedia> {
    return this.http.get<WpMedia>(`${this.wpApiUrl}${WP_ENDPOINTS.media}/${id}`);
  }
}
