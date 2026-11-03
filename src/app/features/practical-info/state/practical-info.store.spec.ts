import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { Page } from '../../../core/models/page.model';
import { PracticalInfoApi } from '../services/practical-info.api';
import { PracticalInfoStore } from './practical-info.store';

const page: Page = { id: 1, slug: 'visa', title: 'Visa', excerpt: 'e', content: 'c' };

describe('PracticalInfoStore', () => {
  const api = { getAllPages: vi.fn() };
  let store: PracticalInfoStore;

  beforeEach(() => {
    api.getAllPages.mockReset();
    TestBed.configureTestingModule({ providers: [{ provide: PracticalInfoApi, useValue: api }] });
    store = TestBed.inject(PracticalInfoStore);
  });

  it('loads pages on success', async () => {
    api.getAllPages.mockReturnValue(of([page]));

    await store.loadPages();

    expect(store.items()).toEqual([page]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('is loading while the request is in flight', async () => {
    const subject = new Subject<Page[]>();
    api.getAllPages.mockReturnValue(subject);

    const promise = store.loadPages();
    expect(store.loading()).toBe(true);

    subject.next([page]);
    subject.complete();
    await promise;
    expect(store.loading()).toBe(false);
  });

  it('sets an error on failure and keeps items empty', async () => {
    api.getAllPages.mockReturnValue(throwError(() => new Error('boom')));

    await store.loadPages();

    expect(store.error()).toBeTruthy();
    expect(store.items()).toEqual([]);
    expect(store.loading()).toBe(false);
  });
});
