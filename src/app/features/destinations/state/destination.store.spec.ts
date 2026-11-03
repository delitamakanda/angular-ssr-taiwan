import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { DestinationStore } from './destination.store';
import { Destination } from '../models/destination.model';

const destination = (id: number, featured: boolean): Destination => ({
  id,
  slug: `d-${id}`,
  name: `D${id}`,
  excerpt: '',
  description: '',
  gallery: [],
  region: '',
  featured,
});

describe('DestinationStore.featuredDestinations', () => {
  it('puts featured first and completes up to 3 with the others', () => {
    const store = TestBed.inject(DestinationStore);
    store.items.set([destination(1, false), destination(2, true), destination(3, false), destination(4, false)]);
    expect(store.featuredDestinations().map(d => d.id)).toEqual([2, 1, 3]);
  });

  it('caps at 3 featured destinations', () => {
    const store = TestBed.inject(DestinationStore);
    store.items.set([1, 2, 3, 4].map(id => destination(id, true)));
    expect(store.featuredDestinations().length).toBe(3);
  });
});
