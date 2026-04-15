import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationDetailStore } from '../../state/destination-detail.store';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { SeoService } from '../../../../core/seo/seo.service';
import { stripHtml } from '../../../../shared/utils/strip-html.util';

@Component({
  selector: 'app-destinations-detail-page.component',
  imports: [RouterLink, StripHtmlPipe],
  providers: [DestinationDetailStore],
  standalone: true,
  templateUrl: './destinations-detail-page.component.html',
  styleUrl: './destinations-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly store = inject(DestinationDetailStore);

  readonly destination = computed(() => this.store.item());

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.store.error.set('No destination slug provided');
      return;
    }
    void this.store.loadDestination(slug!);

    effect(() => {
      const item = this.store.item();
      if(!item) return;

      const description = stripHtml(item.excerpt || item.description);
      this.seo.update({
        title: item.name,
        description: description,
        image: item.cover_image_url,
        canonical_url: `${window.location.origin}/destinations/${slug}`,
      })
    });
  }
}
