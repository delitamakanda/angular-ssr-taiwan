import { Component, ChangeDetectionStrategy, LOCALE_ID, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
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

  private readonly localeCodePattern = this.availableLocales.map((l) => l.code).join('|');
  private readonly localePrefixRe = new RegExp(`^/(${this.localeCodePattern})(?=/|$)`);

  private readonly currentPath = signal(this.stripLocalePrefix(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.currentPath.set(this.stripLocalePrefix(event.urlAfterRedirects)));
  }

  // The URL can already carry the active locale's prefix (e.g. /zh-TW/destinations),
  // so it must be stripped before switching, otherwise prefixes stack on every switch
  // (fr-FR/zh-TW/zh-TW/destinations instead of replacing the old one).
  private stripLocalePrefix(path: string): string {
    const stripped = path.replace(this.localePrefixRe, '');
    return stripped === '' ? '/' : stripped;
  }

  // Each locale is a separate compiled bundle served under /<locale>/, so switching
  // locale needs a full page navigation to the same path under the target locale's prefix,
  // not a routerLink/query param (which the current app build never reads).
  localeHref(code: string): string {
    return `/${code}${this.currentPath()}`;
  }
}
