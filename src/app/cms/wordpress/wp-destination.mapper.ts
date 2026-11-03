import { Destination } from '../../features/destinations/models/destination.model';
import { Media } from './wp-media.mapper';
import { WpDestination } from './wp-api.client';

export function mapWpDestinationWithMedia(item: WpDestination, media?: Media): Destination {
  return {
    id: item.id,
    slug: item.slug,
    name: item.title.rendered,
    excerpt: item.excerpt.rendered,
    description: item.content.rendered,
    cover_image_url: media?.url,
    gallery: item.acf.gallery ?? [],
    region: item.acf.region,
    featured: item.acf.featured ?? false,
  };
}
