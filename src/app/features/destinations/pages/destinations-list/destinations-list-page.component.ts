import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestinationCard } from '../../components/destination-card/destination-card';
import { DestinationStore } from '../../state/destination.store';
import { DestinationFilter } from '../../components/destination-filter/destination-filter';

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

  constructor() {
    this.store.loadDestinations();
  }

  onSearch(term: string): void {
    this.store.setSearchTerm(term);
  }
}
