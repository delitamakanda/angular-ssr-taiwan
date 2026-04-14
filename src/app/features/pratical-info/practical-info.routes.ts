import { Routes } from '@angular/router';

export const PRACTICAL_INFO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/practical-info-page.component').then(
        (m) => m.PracticalInfoPageComponent,
      ),
  },
];
