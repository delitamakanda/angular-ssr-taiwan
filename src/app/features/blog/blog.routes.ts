import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/article-list/article-list-page.component').then(
        (m) => m.ArticleListPageComponent,
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/article-detail/article-detail-page.component').then(
        (m) => m.ArticleDetailPageComponent,
      ),
  },
];
