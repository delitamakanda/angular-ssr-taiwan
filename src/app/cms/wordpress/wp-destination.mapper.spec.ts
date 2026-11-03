import { mapWpDestinationWithMedia } from './wp-destination.mapper';
import { Media } from './wp-media.mapper';

const media: Media = { id: 3, url: 'https://cdn/cover.jpg', alt: 'Cover' };

function wpDestination(acf: Record<string, unknown> = {}) {
  return {
    id: 1,
    slug: 'taipei',
    title: { rendered: 'Taipei' },
    excerpt: { rendered: '<p>Capital</p>' },
    content: { rendered: '<p>Long description</p>' },
    acf,
  };
}

describe('mapWpDestinationWithMedia', () => {
  it('maps a nominal destination', () => {
    const result = mapWpDestinationWithMedia(
      wpDestination({ gallery: ['a.jpg', 'b.jpg'], region: 'North', featured: true }),
      media,
    );

    expect(result).toEqual({
      id: 1,
      slug: 'taipei',
      name: 'Taipei',
      excerpt: '<p>Capital</p>',
      description: '<p>Long description</p>',
      cover_image_url: 'https://cdn/cover.jpg',
      gallery: ['a.jpg', 'b.jpg'],
      region: 'North',
      featured: true,
    });
  });

  it('leaves cover_image_url undefined without media', () => {
    expect(mapWpDestinationWithMedia(wpDestination()).cover_image_url).toBeUndefined();
  });

  it('applies defaults when acf fields are missing', () => {
    const result = mapWpDestinationWithMedia(wpDestination(), media);

    expect(result.gallery).toEqual([]);
    expect(result.region).toBeUndefined();
    expect(result.featured).toBe(false);
  });
});
