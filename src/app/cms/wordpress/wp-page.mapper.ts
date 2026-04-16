import { Page} from '../../core/models/page.model';
import { Media} from './wp-media.mapper';

export function mapWpPageWithMedia(page: any, media?: Media): Page {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title.rendered,
    excerpt: page.excerpt.rendered,
    content: page.content.rendered,
    cover_image_url: media? media.url : undefined,
    published_at: page.date,
    template: page.template,
  }
}
