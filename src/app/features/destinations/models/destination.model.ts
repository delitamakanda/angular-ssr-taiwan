export interface Destination {
  id: number;
  slug: string;
  name: string;
  excerpt: string;
  description: string;
  cover_image_url?: string;
  gallery: string[];
  region: string;
  featured: boolean;
  published_at?: string;
}
