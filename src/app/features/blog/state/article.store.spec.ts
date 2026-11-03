import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { ArticleApi } from '../services/article.api';
import { Article } from '../models/article.model';
import { ArticleStore } from './article.store';

const article: Article = { id: 1, slug: 'a', title: 'A', excerpt: 'e', content: 'c' };

describe('ArticleStore', () => {
  const api = { getAllArticles: vi.fn() };
  let store: ArticleStore;

  beforeEach(() => {
    api.getAllArticles.mockReset();
    TestBed.configureTestingModule({ providers: [{ provide: ArticleApi, useValue: api }] });
    store = TestBed.inject(ArticleStore);
  });

  it('loads articles on success', async () => {
    api.getAllArticles.mockReturnValue(of([article]));

    await store.fetchArticles();

    expect(store.articles()).toEqual([article]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('is loading while the request is in flight', async () => {
    const subject = new Subject<Article[]>();
    api.getAllArticles.mockReturnValue(subject);

    const promise = store.fetchArticles();
    expect(store.loading()).toBe(true);

    subject.next([article]);
    subject.complete();
    await promise;
    expect(store.loading()).toBe(false);
  });

  it('sets an error on failure and keeps articles empty', async () => {
    api.getAllArticles.mockReturnValue(throwError(() => new Error('boom')));

    await store.fetchArticles();

    expect(store.error()).toBeTruthy();
    expect(store.articles()).toEqual([]);
    expect(store.loading()).toBe(false);
  });
});
