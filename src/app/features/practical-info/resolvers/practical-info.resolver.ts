import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PracticalInfoApi } from '../services/practical-info.api';
import { catchError, Observable, of } from 'rxjs';
import { Page } from '../../../core/models/page.model';

export const practicalInfoResolver: ResolveFn<Observable<Page | null>> = (route) => {
  const api = inject(PracticalInfoApi);
  const router = inject(Router);

  const slug = route.url.map(urlSegment => urlSegment.path).join('/');
  console.log('practicalInfoResolver slug:', slug);
  return api.getPageBySlug(slug).pipe(
    catchError(()=> {
      router.navigate(['/not-found']);
      return of(null)
    })
  );
};
