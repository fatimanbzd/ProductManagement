import {HttpClient, HttpInterceptorFn} from '@angular/common/http';
import {jwtDecode} from "jwt-decode";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);

  // const url = 'http://localhost:3000'
  const token = localStorage.getItem('token');

  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;

      if (isExpired) {
        console.log("Expired!");
        localStorage.removeItem('token');
        router.navigateByUrl('/login');
      } else
      {
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`

          }
        })
      }
    }
    catch {
      console.log('invalid Token')
    }
  } else
    router.navigateByUrl('login');

  return next(req);
};
