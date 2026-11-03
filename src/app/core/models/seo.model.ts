export interface SeoData {
  title: string;
  description?: string;
  image?: string;
  /** Route path without locale prefix (e.g. `/blog/my-post`); canonical and hreflang derive from it. */
  path?: string;
  type?: 'page' | 'article';
  noindex?: boolean;
}
