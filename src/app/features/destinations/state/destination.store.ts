import { computed, inject, Injectable, signal } from '@angular/core';
import { DestinationsApi } from '../services/destinations.api';
import { Destination } from '../models/destination.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationStore {
  private readonly api = inject(DestinationsApi);
  readonly items = signal<Destination[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly searchTerm = signal<string>('');

  readonly filteredItems = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    if (searchTerm === '') {
      this.items();
    }
    return this.items().filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.excerpt.toLowerCase().includes(searchTerm) ||
      (item.region ?? '').toLowerCase().includes(searchTerm)
    );
  })

  async loadDestinations() : Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const destinations = await firstValueFrom(this.api.getAllDestinations());
      this.items.set(destinations);
    } catch (error) {
      this.error.set('impossible to load destinations. Please try again later');
    } finally {
      this.loading.set(false);
    }
  }

  setSearchTerm(value: string) : void {
    this.searchTerm.set(value);
  }
}
