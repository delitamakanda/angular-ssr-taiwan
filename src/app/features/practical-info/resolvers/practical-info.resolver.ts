import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PracticalInfoApi } from '../services/practical-info.api';
import { catchError, Observable, of } from 'rxjs';
import { Page } from '../../../core/models/page.model';

export const practicalInfoResolver: ResolveFn<Page | null> = (route) => {
  const api = inject(PracticalInfoApi);
  const router = inject(Router);

  const slug = route.paramMap.get('slug') ?? '';

  return api.getPageBySlug(slug).pipe(
    catchError((error) => {
      router.navigateByUrl('/not-found');
      return of(null);
    })
  )


};
