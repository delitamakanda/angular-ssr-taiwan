import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestinationCard } from '../../components/destination-card/destination-card';
import { DestinationStore } from '../../state/destination.store';
import { DestinationFilter } from '../../components/destination-filter/destination-filter';
import { SeoService } from '../../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-destinations-list-page.component',
  imports: [DestinationCard, DestinationFilter],
  providers: [DestinationStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './destinations-list-page.component.html',
  styleUrl: './destinations-list-page.component.scss',
})
export class DestinationsListPageComponent {
  readonly store = inject(DestinationStore);
  private readonly seo = inject(SeoService);

  constructor() {
    this.store.loadDestinations();
    this.seo.update({
      title: 'Discover Our Destinations',
      description: 'Our diverse range of destinations for you to explore',
      canonical_url: `${SITE_CONFIG.site_url}/destinations`,
    })
  }

  onSearch(term: string): void {
    this.store.setSearchTerm(term);
  }
}
