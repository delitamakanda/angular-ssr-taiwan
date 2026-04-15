import { inject, Injectable } from '@angular/core';
import { WordpressApiClient } from '../../../cms/wordpress/wp-api.client';
import { forkJoin, map, switchMap } from 'rxjs';
import { Article } from '../models/article.model';
import { mapWpPostWithMedia } from '../../../cms/wordpress/wp-post.mapper';
import { mapWpMedia } from '../../../cms/wordpress/wp-media.mapper';

@Injectable({
  providedIn: 'root'
})
export class ArticleApi {
  private readonly wp = inject(WordpressApiClient);

  getAllArticles() {
    return this.wp.getPosts().pipe(
      switchMap((items) => {
        if (items.length === 0) {
          return [<Article[]>[]];
        }
        return forkJoin(
          items.map((item) => {
            const mediaId = item.featured_media;
            if (!mediaId) {
              return [mapWpPostWithMedia(mediaId)];
            }
            return this.wp.getMediaById(mediaId).pipe(
              map((media) => {
                return mapWpPostWithMedia(item, mapWpMedia(media));
              })
            )
          })
        )
      })
    )
  }

  getArticleBySlug(slug: string) {
    return this.wp.getPostBySlug(slug).pipe(
      switchMap((item) => {
        const mediaId = item.featured_media;
        if (!mediaId) {
          return [mapWpPostWithMedia(mediaId)];
        }
        return this.wp.getMediaById(mediaId).pipe(
          map((media) => {
            return mapWpPostWithMedia(item, mapWpMedia(media));
          })
        )
      })
    )
  }
}
