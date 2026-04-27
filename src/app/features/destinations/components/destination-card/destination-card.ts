import { Component, input } from '@angular/core';
import { Destination } from '../../models/destination.model';
import { RouterLink } from '@angular/router';
import { StripHtmlPipe } from '../../../../shared/pipes/strip-html.pipe';
import { LazyImageDirective } from '../../../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [RouterLink, StripHtmlPipe, LazyImageDirective],
  templateUrl: './destination-card.html',
  styleUrl: './destination-card.scss',
})
export class DestinationCard {
  readonly destination = input.required<Destination>();
  priority = input<'high' | 'low'>('low');
}
