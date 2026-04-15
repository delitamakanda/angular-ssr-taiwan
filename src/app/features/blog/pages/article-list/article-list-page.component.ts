import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleHero } from '../../components/article-hero/article-hero';
import { ArticleCard } from '../../components/article-card/article-card';
import { ArticleStore } from '../../state/article.store';
import { SeoService } from '../../../../core/seo/seo.service';

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
  private readonly seo = inject(SeoService);

  constructor() {
    this.store.fetchArticles();
    this.seo.update({
      title: 'Latest Articles',
      description: 'Discover the latest news articles from around the world.',
      canonical_url: `${window.location.origin}}/blog`,
    })
  }
}
