export interface Media {
  id: number;
  url: string;
  alt: string;
}

export function mapWpMedia(media: any): Media {
  return {
    id: media.id,
    url: media.source_url,
    alt: media.alt_text,
  };
}
