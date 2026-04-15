import { inject, Injectable } from '@angular/core';
import { WordpressApiClient } from '../../../cms/wordpress/wp-api.client';
import { forkJoin, map, switchMap } from 'rxjs';
import { mapWpDestinationWithMedia } from '../../../cms/wordpress/wp-destination.mapper';
import { mapWpMedia } from '../../../cms/wordpress/wp-media.mapper';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationsApi {
  private readonly wp = inject(WordpressApiClient);

  getAllDestinations() {
    return this.wp.getDestinations().pipe(
      switchMap((items) => {
        if (items.length === 0) {
          return [<Destination[]>[]];
        }
        return forkJoin(
          items.map((item) => {
            const mediaId = item.featured_media;
            if (!mediaId) {
              return [mapWpDestinationWithMedia(item)];
            }
            return this.wp.getMediaById(mediaId).pipe(
              map((media) => {
                return mapWpDestinationWithMedia(item, mapWpMedia(media));
              })
            );
          })
        );
      })
    );
  }

  getBySlug(slug: string) {
    return this.wp.getDestinationBySlug(slug).pipe(
      switchMap((item) => {
        if (!item) {
          throw new Error('Destination not found');
        }
        const mediaId = item.featured_media;
        if (!mediaId) {
          return [mapWpDestinationWithMedia(item)];
        }
        return this.wp.getMediaById(mediaId).pipe(
          map((media) => {
            return mapWpDestinationWithMedia(item, mapWpMedia(media));
          })
        );
      })
    );
  }
}
