import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestinationCard } from '../../components/destination-card/destination-card';
import { DestinationStore } from '../../state/destination.store';

@Component({
  selector: 'app-destinations-list-page.component',
  imports: [DestinationCard],
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

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setSearchTerm(target.value);
  }
}
