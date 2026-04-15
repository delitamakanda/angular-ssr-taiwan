import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { ArticleDetailStore } from '../../state/article-detail';
import { SeoService } from '../../../../core/seo/seo.service';
import { stripHtml } from '../../../../shared/utils/strip-html.util';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  providers: [ArticleDetailStore],
  imports: [RouterLink, StripHtmlPipe],
  templateUrl: './article-detail-page.component.html',
  styleUrl: './article-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailPageComponent {
  private route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly store = inject(ArticleDetailStore);

  readonly article = computed(() => this.store.article());

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
        canonical_url: `${window.location.origin}/blog/${slug}`,
        type: 'article',
      });
    });
  }
}
