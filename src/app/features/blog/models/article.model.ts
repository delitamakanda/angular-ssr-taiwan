export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  published_at?: string;
}
