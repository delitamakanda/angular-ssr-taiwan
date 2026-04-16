import { inject, Injectable } from '@angular/core';
import { WordpressApiClient } from '../../../cms/wordpress/wp-api.client';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Page } from '../../../core/models/page.model';
import { mapWpPageWithMedia } from '../../../cms/wordpress/wp-page.mapper';
import { mapWpMedia } from '../../../cms/wordpress/wp-media.mapper';

@Injectable({
  providedIn: 'root'
})
export class PracticalInfoApi {
  private readonly wp = inject(WordpressApiClient);

  getAllPages(): Observable<Page[]> {
    return this.wp.getPage().pipe(
      switchMap((items) => {
      if (items.length === 0) {
        return [<Page[]>[]];
      }
      return forkJoin(
        items.map((item) => {
          const mediaId = item.featured_media;
          if (!mediaId) {
            return [mapWpPageWithMedia(item)];
          }
          return this.wp.getMediaById(mediaId).pipe(
            map((media) => {
              return mapWpPageWithMedia(item, mapWpMedia(media));
            })
          );
        })
      );
    })
    );
  }

  getPageByTemplate(templateName: string): Observable<Page[]> {
    return this.wp.getPageByTemplate(templateName).pipe(
      switchMap((items) => {
        if (items.length === 0) {
          return [<Page[]>[]];
        }
        return forkJoin(
          items.map((item) => {
            const mediaId = item.featured_media;
            if (!mediaId) {
              return [mapWpPageWithMedia(item)];
            }
            return this.wp.getMediaById(mediaId).pipe(
              map((media) => {
                return mapWpPageWithMedia(item, mapWpMedia(media));
              })
            );
          })
        );
      })
    );
  }

  getPageBySlug(slug: string): Observable<Page> {
    return this.wp.getPageBySlug(slug).pipe(
      switchMap((items) => {
        let item = items[0];
        if (!item) {
          throw new Error(`Page not found with slug: ${slug}`);
        }
        const mediaId = item.featured_media;
        if (!mediaId) {
          return [mapWpPageWithMedia(item)];
        }
        return this.wp.getMediaById(mediaId).pipe(
          map((media) => {
            return mapWpPageWithMedia(item, mapWpMedia(media));
          })
        );
      })
    )
  }
}
