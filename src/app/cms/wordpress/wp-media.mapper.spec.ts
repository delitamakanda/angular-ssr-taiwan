import { mapWpMedia } from './wp-media.mapper';

describe('mapWpMedia', () => {
  it('maps id, source_url to url and alt_text to alt', () => {
    expect(mapWpMedia({ id: 7, source_url: 'https://cdn/img.jpg', alt_text: 'A temple' })).toEqual({
      id: 7,
      url: 'https://cdn/img.jpg',
      alt: 'A temple',
    });
  });
});
