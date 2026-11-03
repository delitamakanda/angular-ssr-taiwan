import { mapWpPageWithMedia } from './wp-page.mapper';
import { Media } from './wp-media.mapper';

const media: Media = { id: 3, url: 'https://cdn/cover.jpg', alt: 'Cover' };

const wpPage = {
  id: 20,
  slug: 'visa',
  title: { rendered: 'Visa' },
  excerpt: { rendered: '<p>Short</p>' },
  content: { rendered: '<p>Full</p>' },
  date: '2025-01-02T10:00:00',
  template: 'practical-info',
};

describe('mapWpPageWithMedia', () => {
  it('maps a nominal page, mapping date to published_at and keeping template', () => {
    expect(mapWpPageWithMedia(wpPage, media)).toEqual({
      id: 20,
      slug: 'visa',
      title: 'Visa',
      excerpt: '<p>Short</p>',
      content: '<p>Full</p>',
      cover_image_url: 'https://cdn/cover.jpg',
      published_at: '2025-01-02T10:00:00',
      template: 'practical-info',
    });
  });

  it('leaves cover_image_url undefined without media', () => {
    expect(mapWpPageWithMedia(wpPage).cover_image_url).toBeUndefined();
  });
});
