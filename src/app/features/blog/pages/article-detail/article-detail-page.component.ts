import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { ArticleDetailStore } from '../../state/article-detail';

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
  readonly store = inject(ArticleDetailStore);

  readonly article = computed(() => this.store.article());

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.store.error.set('No slug provided');
      return;
    }
    void this.store.fetchArticle(slug);
  }
}
