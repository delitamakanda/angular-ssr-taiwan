import { Injectable, computed, inject, signal } from '@angular/core';
import { Page } from '../../../core/models/page.model';
import { firstValueFrom } from 'rxjs';
import { PracticalInfoApi } from '../services/practical-info.api';

@Injectable({
  providedIn: 'root'
})
export class PracticalInfoStore {
  private readonly api = inject(PracticalInfoApi);
  readonly items = signal<Page[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  async loadPages(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(this.api.getAllPages());
      this.items.set(response);
    } catch (error) {
      this.error.set('Failed to load practical information pages. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }
}
