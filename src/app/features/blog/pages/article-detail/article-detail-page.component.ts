import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { ArticleDetailStore } from '../../state/article-detail';
import { SeoService } from '../../../../core/seo/seo.service';
import { stripHtml } from '../../../../shared/utils/strip-html.util';
import { SITE_CONFIG } from '@app/core/config/site.config';
import { LazyImageDirective } from '@app/shared/directives/lazy-image.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  providers: [ArticleDetailStore],
  imports: [CommonModule, RouterLink, StripHtmlPipe, NgOptimizedImage, LazyImageDirective],
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailPageComponent {
  private route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly store = inject(ArticleDetailStore);

  readonly article = computed(() => this.store.article());

  priority = input<'high' | 'low'>('low');

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.store.error.set('No slug provided');
      return;
    }
    void this.store.fetchArticle(slug);

    effect(() => {
      const item = this.store.article();
      if (!item) return;

      const description = stripHtml(item.excerpt || item.content);
      this.seo.update({
        title: item.title,
        description: description,
        image: item.cover_image_url,
        canonical_url: `${SITE_CONFIG.site_url}/blog/${slug}`,
        type: 'article',
      });
    });
  }
}
