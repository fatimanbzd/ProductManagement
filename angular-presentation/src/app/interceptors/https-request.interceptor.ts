import {HttpInterceptorFn} from '@angular/common/http';

export const httpsRequestInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = 'http://localhost:5172';
  const modifiedRequest = req.clone({
    url: `${baseUrl}${req.url}`
  });

  return next(modifiedRequest);
};
