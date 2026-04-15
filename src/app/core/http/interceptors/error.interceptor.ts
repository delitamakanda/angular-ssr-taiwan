import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      // Handle error here
      console.error('Error occurred:', error);

      // Return a new Observable with the error response
      return throwError(() => error.message || 'Server error');
    })
  );
}
