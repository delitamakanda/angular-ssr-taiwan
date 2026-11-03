import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { DestinationsApi } from '../services/destinations.api';
import { Destination } from '../models/destination.model';
import { DestinationStore } from './destination.store';

function destination(overrides: Partial<Destination>): Destination {
  return {
    id: 1,
    slug: 's',
    name: 'Name',
    excerpt: 'Excerpt',
    description: 'd',
    gallery: [],
    region: 'Region',
    featured: false,
    ...overrides,
  };
}

const taipei = destination({ id: 1, name: 'Taipei', excerpt: 'Capital city', region: 'North' });
const tainan = destination({ id: 2, name: 'Tainan', excerpt: 'Old temples', region: 'South' });
// The model types region as required, but the mapper can produce undefined at runtime.
const noRegion = destination({ id: 3, name: 'Hualien', excerpt: 'Gorge' });
(noRegion as { region?: string }).region = undefined;

describe('DestinationStore', () => {
  const api = { getAllDestinations: vi.fn() };
  let store: DestinationStore;

  beforeEach(() => {
    api.getAllDestinations.mockReset();
    TestBed.configureTestingModule({ providers: [{ provide: DestinationsApi, useValue: api }] });
    store = TestBed.inject(DestinationStore);
  });

  describe('loadDestinations', () => {
    it('loads items on success', async () => {
      api.getAllDestinations.mockReturnValue(of([taipei]));

      await store.loadDestinations();

      expect(store.items()).toEqual([taipei]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('is loading while the request is in flight', async () => {
      const subject = new Subject<Destination[]>();
      api.getAllDestinations.mockReturnValue(subject);

      const promise = store.loadDestinations();
      expect(store.loading()).toBe(true);

      subject.next([taipei]);
      subject.complete();
      await promise;
      expect(store.loading()).toBe(false);
    });

    it('sets an error on failure and keeps items empty', async () => {
      api.getAllDestinations.mockReturnValue(throwError(() => new Error('boom')));

      await store.loadDestinations();

      expect(store.error()).toBeTruthy();
      expect(store.items()).toEqual([]);
      expect(store.loading()).toBe(false);
    });
  });

  describe('filteredItems', () => {
    beforeEach(() => {
      store.items.set([taipei, tainan, noRegion]);
    });

    it('returns all items for an empty term', () => {
      expect(store.filteredItems()).toEqual([taipei, tainan, noRegion]);
    });

    it('returns all items for a whitespace-only term', () => {
      store.setSearchTerm('   ');
      expect(store.filteredItems()).toEqual([taipei, tainan, noRegion]);
    });

    it('filters on name, case-insensitively and trimmed', () => {
      store.setSearchTerm('  TAIPEI ');
      expect(store.filteredItems()).toEqual([taipei]);
    });

    it('filters on excerpt', () => {
      store.setSearchTerm('temples');
      expect(store.filteredItems()).toEqual([tainan]);
    });

    it('filters on region', () => {
      store.setSearchTerm('south');
      expect(store.filteredItems()).toEqual([tainan]);
    });

    it('does not throw when region is missing', () => {
      store.setSearchTerm('gorge');
      expect(store.filteredItems()).toEqual([noRegion]);
    });

    it('returns an empty array when nothing matches', () => {
      store.setSearchTerm('zzz');
      expect(store.filteredItems()).toEqual([]);
    });
  });
});
