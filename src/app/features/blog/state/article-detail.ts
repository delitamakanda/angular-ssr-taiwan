import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../models/article.model';
import { firstValueFrom } from 'rxjs';
import { ArticleApi } from '../services/article.api';

@Injectable({
  providedIn: 'root',
})
export class ArticleDetailStore {
  private readonly api = inject(ArticleApi);

  readonly article = signal<Article | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  async fetchArticle(slug: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.article.set(null);

    try {
      const response = await firstValueFrom(this.api.getArticleBySlug(slug));
      this.article.set(response);
    } catch (error) {
      this.error.set('Failed to fetch article. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }
}
