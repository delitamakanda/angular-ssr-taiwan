import { inject, Injectable, signal } from '@angular/core';
import { DestinationsApi } from '../services/destinations.api';
import { Destination } from '../models/destination.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationDetailStore {
  private readonly api = inject(DestinationsApi);

  readonly item = signal<Destination | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  async loadDestination(slug: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.item.set(null);

    try {
      const response = await firstValueFrom(this.api.getBySlug(slug));
      this.item.set(response);
    } catch (error) {
      this.error.set('Failed to load destination. Please try again later');
    } finally {
      this.loading.set(false);
    }
  }
}
