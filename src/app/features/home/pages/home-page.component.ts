import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from '../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-home-page.component',
  imports: [],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Taiwan Travel',
      description: 'Discover Taiwan with our travel blog, guides, and exclusive offers.',
      canonical_url: `${SITE_CONFIG.site_url}`,
    });
  }
}
