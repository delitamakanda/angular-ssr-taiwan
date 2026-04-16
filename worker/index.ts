export const db = {
  posts: [
    {
      id: 9,
      slug: 'taiwan-travel-blog',
      title: { rendered: 'Taiwan Travel Blog' },
      excerpt: { rendered: '<p>Discover the beauty of Taiwan in our blog.</p>' },
      content: { rendered: '<p>Discover the beauty of Taiwan in our blog.</p>' },
      featured_media: 3,
    },
  ],
  destinations: [
    {
      id: 10,
      slug: 'taipei',
      title: { rendered: 'Taipei' },
      excerpt: {
        rendered:
          '<p>Taipei mêle temples, cafés modernes, marchés de nuit et montagnes accessibles en métro.</p>',
      },
      content: {
        rendered:
          '<p>Taipei City is the capital of Taiwan and the most populous city in the world.</p>',
      },
      featured_media: 1,
      acf: {
        region: 'north',
        featured: true,
        gallery: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGc_5niYCFjHkoAYKGf_4QsGNchIkUOhi6Q&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWxPr1B7KWQgIE6ClvBs26_3w4FlagxHV7A&s',
        ],
      },
    },
    {
      id: 11,
      slug: 'kaohsiung',
      title: { rendered: 'Kaohsiung' },
      excerpt: {
        rendered:
          '<p>Kaohsiung séduit par son port, son art urbain, ses temples et son ambiance détendue au sud de Taïwan.</p>',
      },
      content: { rendered: '<p>Kaohsiung is the capital and most populous city of Taiwan.</p>' },
      featured_media: 5,
      acf: {
        region: 'south',
        featured: false,
        gallery: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGc_5niYCFjHkoAYKGf_4QsGNchIkUOhi6Q&s',
          'https://worldwildbrice.net/wp-content/uploads/2019/03/kaohsiung-taiwan.jpg',
        ],
      },
    },
    {
      id: 12,
      slug: 'hualien',
      title: { rendered: 'Hualien' },
      excerpt: {
        rendered:
          '<p>Hualien est une porte d’entrée idéale vers les paysages spectaculaires de la côte est et les gorges de Taroko.</p>',
      },
      content: { rendered: '<p>Hualien is the capital and most populous city of Taiwan.</p>' },
      featured_media: 6,
      acf: {
        region: 'east',
        featured: false,
        gallery: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGc_5niYCFjHkoAYKGf_4QsGNchIkUOhi6Q&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_bmSmCVnP0HDz-isEgM7qo3StXNki-kw2bw&s',
        ],
      },
    },
    {
      id: 13,
      slug: 'tainan',
      title: { rendered: 'Tainan' },
      excerpt: { rendered: '<p>Tainan is the capital and most populous city of Taiwan.</p>' },
      content: { rendered: '<p>Tainan is the capital and most populous city of Taiwan.</p>' },
      featured_media: 2,
      acf: {
        region: 'west',
        featured: false,
        gallery: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGc_5niYCFjHkoAYKGf_4QsGNchIkUOhi6Q&s',
        ],
      },
    },
    {
      id: 14,
      slug: 'taichung',
      title: { rendered: 'Taichung' },
      excerpt: { rendered: '<p>Taichung is the capital and most populous city of Taiwan.</p>' },
      content: { rendered: '<p>Taichung is the capital and most populous city of Taiwan.</p>' },
      featured_media: 3,
      acf: {
        region: 'central',
        featured: false,
        gallery: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGc_5niYCFjHkoAYKGf_4QsGNchIkUOhi6Q&s',
          'https://www.agoda.com/wp-content/uploads/2024/08/taichung-taiwan-featured.jpg',
          'https://www.agoda.com/wp-content/uploads/2024/02/Featured-image-Wufeng-Lin-Family-Mansion-and-Garden-Taichung-Taiwan-1244x700.jpg',
        ],
        tags: ['Taiwan', 'Travel'],
      },
    },
  ],
  pages: [
    {
      id: 4,
      slug: 'about-taiwan',
      title: { rendered: 'About Taiwan' },
      excerpt: {
        rendered:
          '<p>Taiwan is a country with rich history and a rich culture. It is known for its beautiful landscapes, rich culture, and vibrant traditions.</p>',
      },
      content: {
        rendered:
          '<p>Taiwan is a country with rich history and a rich culture. It is known for its beautiful landscapes, rich culture, and vibrant traditions.</p>',
      },
      template: 'practical-info',
    },
    {
      id: 20,
      slug: 'weather',
      title: { rendered: 'Weather' },
      excerpt: { rendered: '<p>Check out the weather forecast for Taiwan.</p>' },
      content: { rendered: '<p>Check out the weather forecast for Taiwan.</p>' },
      featured_media: 7,
      template: 'practical-info',
    },
    {
      id: 21,
      slug: 'visa',
      title: { rendered: 'Visa' },
      excerpt: { rendered: '<p>Check out the visa requirements for Taiwan.</p>' },
      content: { rendered: '<p>Check out the visa requirements for Taiwan.</p>' },
      featured_media: 8,
      template: 'practical-info',
    },
    {
      id: 22,
      slug: 'transportation',
      title: { rendered: 'Transportation' },
      excerpt: { rendered: '<p>Check out the transportation options in Taiwan.</p>' },
      content: { rendered: '<p>Check out the transportation options in Taiwan.</p>' },
      featured_media: 9,
      template: 'practical-info',
    },
    {
      id: 23,
      slug: 'culture',
      title: { rendered: 'Culture' },
      excerpt: { rendered: '<p>Check out the cultural experiences in Taiwan.</p>' },
      content: { rendered: '<p>Check out the cultural experiences in Taiwan.</p>' },
      template: 'practical-info',
    },
    {
      id: 24,
      slug: 'accommodation',
      title: { rendered: 'Accommodation' },
      excerpt: { rendered: '<p>Check out the accommodation options in Taiwan.</p>' },
      content: { rendered: '<p>Check out the accommodation options in Taiwan.</p>' },
      template: 'practical-info',
    },
  ],
  media: [
    {
      id: 1,
      source_url:
        'https://static.vecteezy.com/ti/photos-gratuite/p2/2057422-taipei-101-tour-et-vue-de-taipei-taiwan-gratuit-photo.jpg',
      alt_text: 'Vue de Taipei Taiwan',
    },
    {
      id: 2,
      source_url: 'https://www.taiwan-roads.fr/wp-content/uploads/2019/04/Taichung-Taiwan4.jpg',
      alt_text: 'Vue de Taichung Taiwan',
    },
    {
      id: 3,
      source_url: 'https://www.agoda.com/wp-content/uploads/2024/06/hsinchu-taiwan-2-1244x700.jpg',
      alt_text: 'Vue de Hsinchu Taiwan',
    },
    {
      id: 4,
      source_url: 'https://www.taiwan-roads.fr/wp-content/uploads/2019/04/Tainan-Taiwan2.jpg',
      alt_text: 'Vue de Tainan Taiwan',
    },
    {
      id: 5,
      source_url: 'https://chrisandwrensworld.com/wp-content/uploads/2024/06/DJI_0952-1.jpeg',
      alt_text: 'Vue de Kaohsiung Taiwan',
    },
    {
      id: 6,
      source_url: 'https://peakvisor.com/photo/SD/Hualien-County-Taiwan-Suhua-Highway.jpg',
      alt_text: 'Vue de Hualien Taiwan',
    },
    {
      id: 7,
      source_url: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70',
      alt_text: 'Weather Taiwan',
    },
    {
      id: 8,
      source_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
      alt_text: 'Passeport and visa',
    },
    {
      id: 9,
      source_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
      alt_text: 'Transportation Taiwan',
    },
  ],
} as const;

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

type Env = {
  ASSETS: Fetcher;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  })
}

function notFound(message = 'Not found'): Response {
  return json({ error: { message } }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // posts
    if (pathname === '/wp-json/wp/v2/posts') {
      let items = [db.posts];
      const slug = searchParams.get('slug');
      if (slug) {
        items = items.filter((post: any) => post.slug === slug);
      }
      return json(items);
    }

    // destinations

    if (pathname === '/wp-json/wp/v2/destinations') {
      let items = [db.destinations];
      const slug = searchParams.get('slug');
      if (slug) {
        items = items.filter((destination: any) => destination.slug === slug);
      }
      return json(items);
    }

    // pages
    if (pathname === '/wp-json/wp/v2/pages') {
      let items = [db.pages];
      const slug = searchParams.get('slug');
      const template = searchParams.get('template');
      if (slug) {
        items = items.filter((page: any) => page.slug === slug);
      }
      if (template) {
        items = items.filter((page: any) => page.template === template);
      }
      return json(items);
    }

    // media
    if (pathname.startsWith('/wp-json/wp/v2/media/')) {
      const id = parseInt(pathname.split('/').pop() || '', 10);
      const item = db.media.find(media => media.id === id);
      if (!item) {
        return notFound();
      }
      return json(item);
    }

    return env.ASSETS.fetch(request);
  },
};
