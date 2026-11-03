import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PracticalInfoStore } from '../state/practical-info.store';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-practical-info-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './practical-info-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './practical-info-layout.component.scss',
})
export class PracticalInfoLayoutComponent {
  readonly store = inject(PracticalInfoStore);
  private readonly seo = inject(SeoService);

  constructor() {
    this.store.loadPages();
    this.seo.update({
      title: $localize`:@@seo.practicalInfo.title:Practical Information about Taiwan`,
      description: $localize`:@@seo.practicalInfo.description:Learn about the history, culture, and customs of Taiwan, including its unique customs, festivals, and traditions.`,
      path: '/practical-info',
    });
  }
}
