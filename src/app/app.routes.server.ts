import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'destinations/**',
    renderMode: RenderMode.Server
  },
  {
    path: 'blog/**',
    renderMode: RenderMode.Server
  },
  {
    path: 'practical-info/**',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
