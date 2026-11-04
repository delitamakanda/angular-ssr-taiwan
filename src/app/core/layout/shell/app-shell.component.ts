import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer-component';
import { HeaderComponent } from '../header/header-component';
import { LoadingService } from '@app/core/services/loading.service';
import { LoaderComponent } from '@app/shared/component/loader/loader.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, LoaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col min-h-screen">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-700"
        i18n="@@header.skip"
        >Skip to content</a
      >
      <app-header />
      @if (loadingService.loading()) {
        <div class="flex items-center justify-center h-screen">
          <app-loader />
        </div>
      }
      <main
        id="main-content"
        tabindex="-1"
        class="flex-1 focus:outline-none max-w-6xl mx-auto w-full px-4 py-6"
      >
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppShellComponent {
  readonly loadingService = inject(LoadingService);
}
