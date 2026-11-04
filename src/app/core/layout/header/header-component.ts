import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '@app/core/config/site.config';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LanguageSwitcherComponent],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header-component.scss',
  host: { '(keydown.escape)': 'onEscape()' },
})
export class HeaderComponent {
  readonly siteName = SITE_CONFIG.site_name;
  readonly menuOpen = signal(false);

  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onEscape(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.closeMenu();
    this.menuButton()?.nativeElement.focus();
  }
}
