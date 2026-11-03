import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '@app/core/seo/seo.service';
import { DestinationStore } from '@app/features/destinations/state/destination.store';
import { DestinationCard } from '@app/features/destinations/components/destination-card/destination-card';
import { ArticleStore } from '@app/features/blog/state/article.store';
import { ArticleCard } from '@app/features/blog/components/article-card/article-card';

const LATEST_ARTICLES_COUNT = 3;

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage, RouterLink, DestinationCard, ArticleCard],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  private readonly destinationStore = inject(DestinationStore);
  private readonly articleStore = inject(ArticleStore);

  protected readonly destinations = this.destinationStore.featuredDestinations;
  protected readonly latestArticles = computed(() =>
    this.articleStore.articles().slice(0, LATEST_ARTICLES_COUNT),
  );

  constructor() {
    this.seo.update({
      title: $localize`:@@seo.home.title:Taiwan Travel`,
      description: $localize`:@@seo.home.description:Discover Taiwan with our travel blog, guides, and exclusive offers.`,
      path: '/home',
    });

    // Root stores are shared: do not reload data they already hold.
    if (this.destinationStore.items().length === 0 && !this.destinationStore.loading()) {
      void this.destinationStore.loadDestinations();
    }
    if (this.articleStore.articles().length === 0 && !this.articleStore.loading()) {
      void this.articleStore.fetchArticles();
    }
  }
}
