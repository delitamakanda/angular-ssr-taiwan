import {
  Component,
  signal,
  ChangeDetectionStrategy,
  DOCUMENT,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { AppShellComponent } from './core/layout/shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-ssr-taiwan');

  constructor() {
    // index.html is shared by all localized builds: set <html lang> to the served locale.
    inject(DOCUMENT).documentElement.lang = inject(LOCALE_ID);
  }
}
