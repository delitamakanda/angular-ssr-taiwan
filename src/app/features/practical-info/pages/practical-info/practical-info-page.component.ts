import { Component, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from '../../../../core/seo/seo.service';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { Page } from '../../../../core/models/page.model';
import { LazyImageDirective } from '@app/shared/directives/lazy-image.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-practical-info-page',
  imports: [NgOptimizedImage, LazyImageDirective],
  standalone: true,
  templateUrl: './practical-info-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './practical-info-page.component.scss',
})
export class PracticalInfoPageComponent {
  private readonly seo = inject(SeoService);
  readonly page = input<Page | null>();

  readonly priority = input<'high' | 'low'>('low');

  constructor() {
    effect(() => {
      const page = this.page();
      if (!page) {
        return;
      }
      this.seo.update({
        title: page.title || $localize`:@@seo.practicalInfoPage.title:Practical Info`,
        description: page?.excerpt,
        canonical_url: `${SITE_CONFIG.site_url}/practical-info/${page.slug}`,
      });
    });
  }
}
