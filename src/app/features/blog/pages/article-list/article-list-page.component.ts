import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleHero } from '../../components/article-hero/article-hero';
import { ArticleCard } from '../../components/article-card/article-card';
import { ArticleStore } from '../../state/article.store';

@Component({
  selector: 'app-article-list',
  imports: [ArticleHero, ArticleCard],
  providers: [ArticleStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.scss',
})
export class ArticleListPageComponent {
  readonly store = inject(ArticleStore);

  constructor() {
    this.store.fetchArticles();
  }
}
