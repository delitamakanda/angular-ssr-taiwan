import { Routes } from '@angular/router';

export const PRACTICAL_INFO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/practical-info-layout.component').then(
        (m) => m.PracticalInfoLayoutComponent,
      ),
  },
];
