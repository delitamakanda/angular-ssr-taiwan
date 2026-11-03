import { ChangeDetectionStrategy, Component, LOCALE_ID, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SUPPORTED_LOCALES } from '@app/core/config/locales.config';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly router = inject(Router);
  readonly currentLocale = inject(LOCALE_ID);
  readonly locales = SUPPORTED_LOCALES;

  private readonly localePrefixRe = new RegExp(
    `^/(${SUPPORTED_LOCALES.map((l) => l.code).join('|')})(?=/|\\?|#|$)`,
  );

  private readonly currentUrl = signal(this.stripLocalePrefix(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.currentUrl.set(this.stripLocalePrefix(event.urlAfterRedirects)));
  }

  // Each locale is a separate bundle served under /<locale>/, so switching locale needs a
  // full page navigation to the same path (query and fragment included) under the target
  // prefix. A prefix already present in the URL is stripped to avoid stacking prefixes.
  localeHref(code: string): string {
    const url = this.currentUrl();
    return `/${code}${url.startsWith('/') ? url : `/${url}`}`;
  }

  private stripLocalePrefix(url: string): string {
    const stripped = url.replace(this.localePrefixRe, '');
    return stripped === '' || /^[?#]/.test(stripped) ? `/${stripped}` : stripped;
  }
}
