export interface Acf {
  gallery: string[];
  region: string;
  featured: boolean;
}

export interface Destination {
  id: number;
  slug: string;
  name: string;
  excerpt: string;
  destination: string;
  cover_image_url?: string;
  gallery: string[];
  region: string;
  featured: boolean;
  published_at?: string;
}
