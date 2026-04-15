import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private count = signal<number>(0);
  readonly loading = signal<boolean>(false);

  show(): void {
    this.loading.set(true);
    this.count.update((count) => count + 1);
  }

  hide(): void {
    this.count.update((count) => Math.max(0, count - 1) as number);
    if (this.count() === 0) {
      this.loading.set(false);
    }
  }
}
