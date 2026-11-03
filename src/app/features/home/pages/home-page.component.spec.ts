import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HomePageComponent } from './home-page.component';
import { DestinationStore } from '@app/features/destinations/state/destination.store';
import { ArticleStore } from '@app/features/blog/state/article.store';
import { Destination } from '@app/features/destinations/models/destination.model';
import { Article } from '@app/features/blog/models/article.model';
import { DestinationsApi } from '@app/features/destinations/services/destinations.api';
import { ArticleApi } from '@app/features/blog/services/article.api';

const destination = (id: number, featured: boolean): Destination => ({
  id,
  slug: `dest-${id}`,
  name: `Dest ${id}`,
  excerpt: 'excerpt',
  description: '',
  gallery: [],
  region: 'north',
  featured,
});

const article = (id: number): Article =>
  ({ id, slug: `post-${id}`, title: `Post ${id}`, excerpt: 'x' }) as Article;

function setup(destinations: Destination[], articles: Article[]) {
  const destinationStore = TestBed.inject(DestinationStore);
  const articleStore = TestBed.inject(ArticleStore);
  destinationStore.items.set(destinations);
  articleStore.articles.set(articles);
  const loadDestinations = vi.spyOn(destinationStore, 'loadDestinations').mockResolvedValue();
  const fetchArticles = vi.spyOn(articleStore, 'fetchArticles').mockResolvedValue();
  const fixture = TestBed.createComponent(HomePageComponent);
  fixture.detectChanges();
  return { el: fixture.nativeElement as HTMLElement, loadDestinations, fetchArticles };
}

describe('HomePageComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: DestinationsApi, useValue: {} },
        { provide: ArticleApi, useValue: {} },
      ],
    }),
  );

  it('renders a single h1 and a link to /destinations', () => {
    const { el } = setup([], []);
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('a[href="/destinations"]')).not.toBeNull();
  });

  it('shows featured destinations first', () => {
    const { el } = setup(
      [destination(1, false), destination(2, true), destination(3, false), destination(4, true)],
      [],
    );
    const names = Array.from(el.querySelectorAll('app-destination-card h2')).map((h) =>
      h.textContent?.trim(),
    );
    expect(names).toEqual(['Dest 2', 'Dest 4', 'Dest 1']);
  });

  it('limits latest articles to 3', () => {
    const { el } = setup([], [article(1), article(2), article(3), article(4)]);
    expect(el.querySelectorAll('app-article-card').length).toBe(3);
    expect(el.querySelector('a[href="/blog"]')).not.toBeNull();
  });

  it('hides empty sections and keeps the hero', () => {
    const { el, loadDestinations, fetchArticles } = setup([], []);
    expect(el.querySelector('#home-destinations-title')).toBeNull();
    expect(el.querySelector('#home-articles-title')).toBeNull();
    expect(el.querySelector('h1')).not.toBeNull();
    expect(loadDestinations).toHaveBeenCalled();
    expect(fetchArticles).toHaveBeenCalled();
  });

  it('does not reload stores that already hold data', () => {
    const { loadDestinations, fetchArticles } = setup([destination(1, true)], [article(1)]);
    expect(loadDestinations).not.toHaveBeenCalled();
    expect(fetchArticles).not.toHaveBeenCalled();
  });
});
