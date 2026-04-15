import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('wp/')) {
    const apiReq = req.clone({
      url: `${environment.wordpressApiUrl}${req.url.replace('/^wp\//', '')}`,
    });
    return next(apiReq);
  }

  return next(req);
}
