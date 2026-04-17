import { Component, inject, input } from '@angular/core';
import { SeoService } from '../../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { Page } from '../../../../core/models/page.model';

@Component({
  selector: 'app-practical-info-page.component',
  imports: [],
  standalone: true,
  templateUrl: './practical-info-page.component.html',
  styleUrl: './practical-info-page.component.scss',
})
export class PracticalInfoPageComponent {
  private readonly seo = inject(SeoService);
  readonly page = input<Page |null>();

  constructor() {
    this.seo.update({
      title: 'Practical Information',
      description: 'Learn about the practical aspects of using the appliance, such as adjusting settings, troubleshooting, and maintaining it.',
      canonical_url: `${SITE_CONFIG.site_url}/practical-info`,
    })
  }
}
