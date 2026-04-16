import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PracticalInfoStore } from '../state/practical-info.store';
import { SeoService } from '../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-practical-info-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './practical-info-layout.component.html',
  styleUrl: './practical-info-layout.component.scss',
})
export class PracticalInfoLayoutComponent {
  readonly store = inject(PracticalInfoStore);
  private readonly seo = inject(SeoService);

  constructor() {
    this.store.loadPages();
    this.seo.update({
      title: 'Practical Information about Taiwan',
      description: 'Learn about the history, culture, and customs of Taiwan, including its unique customs, festivals, and traditions.',
      canonical_url: `${SITE_CONFIG.site_url}/practical-info`,
    })
  }
}
