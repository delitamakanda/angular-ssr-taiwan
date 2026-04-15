import { inject, Injectable, signal } from '@angular/core';
import { ArticleApi } from '../services/article.api';
import { Article } from '../models/article.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleStore {
  private readonly api = inject(ArticleApi);
  readonly articles = signal<Article[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  async fetchArticles() : Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(this.api.getAllArticles());
      this.articles.set(response);
    } catch (error) {
      this.error.set('Failed to fetch articles. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }
}
