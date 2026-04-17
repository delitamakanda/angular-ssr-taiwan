import { Routes } from '@angular/router';
import { practicalInfoResolver } from './resolvers/practical-info.resolver';

export const PRACTICAL_INFO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/practical-info-layout.component').then(
        (m) => m.PracticalInfoLayoutComponent,
      ),
    children: [
      {
        path: ':slug',
        loadComponent: () =>
          import('./pages/practical-info/practical-info-page.component').then(
            (m) => m.PracticalInfoPageComponent,
          ),
        resolve: {
          page: practicalInfoResolver,
        },
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/practical-info/practical-info-page.component').then(
            (m) => m.PracticalInfoPageComponent,
          ),
        resolve: {
          page: practicalInfoResolver,
        },
      },
    ],
  },
];
