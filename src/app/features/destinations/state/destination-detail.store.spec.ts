import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { DestinationsApi } from '../services/destinations.api';
import { Destination } from '../models/destination.model';
import { DestinationDetailStore } from './destination-detail.store';

const destination: Destination = {
  id: 1,
  slug: 'taipei',
  name: 'Taipei',
  excerpt: 'e',
  description: 'd',
  gallery: [],
  region: 'North',
  featured: false,
};

describe('DestinationDetailStore', () => {
  const api = { getBySlug: vi.fn() };
  let store: DestinationDetailStore;

  beforeEach(() => {
    api.getBySlug.mockReset();
    TestBed.configureTestingModule({ providers: [{ provide: DestinationsApi, useValue: api }] });
    store = TestBed.inject(DestinationDetailStore);
  });

  it('loads a destination on success', async () => {
    api.getBySlug.mockReturnValue(of(destination));

    await store.loadDestination('taipei');

    expect(api.getBySlug).toHaveBeenCalledWith('taipei');
    expect(store.item()).toEqual(destination);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('is loading while the request is in flight', async () => {
    const subject = new Subject<Destination>();
    api.getBySlug.mockReturnValue(subject);

    const promise = store.loadDestination('taipei');
    expect(store.loading()).toBe(true);

    subject.next(destination);
    subject.complete();
    await promise;
    expect(store.loading()).toBe(false);
  });

  it('sets an error on failure and leaves item null', async () => {
    api.getBySlug.mockReturnValue(throwError(() => new Error('boom')));

    await store.loadDestination('taipei');

    expect(store.error()).toBeTruthy();
    expect(store.item()).toBeNull();
    expect(store.loading()).toBe(false);
  });

  it('resets item at the start of each load (no stale data after a failure)', async () => {
    api.getBySlug.mockReturnValue(of(destination));
    await store.loadDestination('taipei');
    expect(store.item()).not.toBeNull();

    const subject = new Subject<Destination>();
    api.getBySlug.mockReturnValue(subject);
    const promise = store.loadDestination('other');
    expect(store.item()).toBeNull();

    subject.error(new Error('boom'));
    await promise;
    expect(store.item()).toBeNull();
    expect(store.error()).toBeTruthy();
  });
});
