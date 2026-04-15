import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-destination-filter',
  imports: [],
  standalone: true,
  templateUrl: './destination-filter.html',
  styleUrl: './destination-filter.scss',
})
export class DestinationFilter {
  readonly filter = output<string>();
  readonly search = input.required<string>();

  updateSearchQuery(event: Event): void {
    this.filter.emit((event.target as HTMLInputElement).value);
  }
}
