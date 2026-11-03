import { Component, ChangeDetectionStrategy, inject, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@app/core/seo/seo.service';
import { SITE_CONFIG } from '@app/core/config/site.config';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  private readonly seo = inject(SeoService);
  // Only provided during SSR: lets the server answer with a real 404 status.
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  constructor() {
    if (this.responseInit) {
      this.responseInit.status = 404;
    }
    this.seo.update({
      title: SITE_CONFIG.site_name,
      noindex: true,
    });
  }
}
