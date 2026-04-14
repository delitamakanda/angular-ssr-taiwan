import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer-component';
import { HeaderComponent } from '../header/header-component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  standalone: true,
  template: `
    <app-header />
  <main class="main-content">
    <router-outlet />
  </main>
    <app-footer />
  `
})
export class AppShellComponent {}
