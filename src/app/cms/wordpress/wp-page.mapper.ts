import { Page } from '../../core/models/page.model';
import { Media } from './wp-media.mapper';
import { WpPage } from './wp-api.client';

export function mapWpPageWithMedia(page: WpPage, media?: Media): Page {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title.rendered,
    excerpt: page.excerpt.rendered,
    content: page.content.rendered,
    cover_image_url: media ? media.url : undefined,
    published_at: page.date,
    template: page.template,
  };
}
