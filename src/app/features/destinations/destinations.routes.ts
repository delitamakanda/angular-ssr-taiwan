import { Routes } from '@angular/router';

export const DESTINATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/destinations-list/destinations-list-page.component').then(m => m.DestinationsListPageComponent)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/destinations-detail/destinations-detail-page.component').then(m => m.DestinationsDetailPageComponent),
  }
];
