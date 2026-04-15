import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationDetailStore } from '../../state/destination-detail.store';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';

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
  readonly store = inject(DestinationDetailStore);

  readonly destination = computed(() => this.store.item());

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.store.error.set('No destination slug provided');
      return;
    }
    void this.store.loadDestination(slug!);
  }
}
