import { Article} from '../../features/blog/models/article.model';
import { Media } from './wp-media.mapper';

export function mapWpPostWithMedia(item: any, media?: Media): Article {
  return {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt.rendered,
    cover_image_url: media?.url,
    title: item.title.rendered,
    content: item.content.rendered,
  };
}
