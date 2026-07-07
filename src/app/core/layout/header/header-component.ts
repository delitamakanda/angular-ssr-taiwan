import { Component, ChangeDetectionStrategy, LOCALE_ID, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SITE_CONFIG } from '@app/core/config/site.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly siteName = SITE_CONFIG.site_name;
  readonly currentLocale = inject(LOCALE_ID);
  readonly availableLocales = [
    { code: 'en-US', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'fr-FR', label: 'Français' },
  ];

}
