import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'destinations',
    loadChildren: () => import('./features/destinations/destinations.routes').then(m => m.DESTINATIONS_ROUTES)
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.routes').then(m => m.BLOG_ROUTES)
  },
  {
    path: 'practical-info',
    loadChildren: () => import('./features/practical-info/practical-info.routes').then(m => m.PRACTICAL_INFO_ROUTES)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/pages/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/pages/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];
