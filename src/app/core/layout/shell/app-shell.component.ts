import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer-component';
import { HeaderComponent } from '../header/header-component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  standalone: true,
  template: `
    <div class="flex flex-col min-h-screen">
    <app-header />
  <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
    <router-outlet />
  </main>
    <app-footer />
      </div>
  `
})
export class AppShellComponent {}
