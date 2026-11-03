import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '@app/core/config/site.config';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LanguageSwitcherComponent],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  readonly siteName = SITE_CONFIG.site_name;
}
