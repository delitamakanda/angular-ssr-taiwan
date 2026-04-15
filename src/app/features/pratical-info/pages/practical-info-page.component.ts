import { Component, inject } from '@angular/core';
import { SeoService } from '../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-practical-info-page.component',
  imports: [],
  templateUrl: './practical-info-page.component.html',
  styleUrl: './practical-info-page.component.scss',
})
export class PracticalInfoPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: `${SITE_CONFIG.site_name} | Practical Information`,
      description:
        'Learn about practical applications and benefits of using the technology in your home',
      canonical_url: `${SITE_CONFIG.site_url}}/practical-info`,
    });
  }
}
