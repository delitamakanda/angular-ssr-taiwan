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
      <app-header />
      @if (loadingService.loading()) {
        <div class="flex items-center justify-center h-screen">
          <app-loader />
        </div>
      }
      <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppShellComponent {
  readonly loadingService = inject(LoadingService);
}
