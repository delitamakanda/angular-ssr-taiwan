import { mapWpPostWithMedia } from './wp-post.mapper';
import { Media } from './wp-media.mapper';

const media: Media = { id: 3, url: 'https://cdn/cover.jpg', alt: 'Cover' };

const wpPost = {
  id: 10,
  slug: 'hello',
  title: { rendered: 'Hello' },
  excerpt: { rendered: '<p>Short</p>' },
  content: { rendered: '<p>Full</p>' },
};

describe('mapWpPostWithMedia', () => {
  it('maps a nominal post', () => {
    expect(mapWpPostWithMedia(wpPost, media)).toEqual({
      id: 10,
      slug: 'hello',
      title: 'Hello',
      excerpt: '<p>Short</p>',
      content: '<p>Full</p>',
      cover_image_url: 'https://cdn/cover.jpg',
    });
  });

  it('leaves cover_image_url undefined without media', () => {
    expect(mapWpPostWithMedia(wpPost).cover_image_url).toBeUndefined();
  });
});
