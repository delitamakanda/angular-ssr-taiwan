import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { AppShellComponent } from './core/layout/shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-ssr-taiwan');
}
