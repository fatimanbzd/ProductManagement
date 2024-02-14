import {HttpInterceptorFn} from '@angular/common/http';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {Config} from "../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  const token = getJwtToken();
  if (token) {
    try {
      let decodedToken: JwtPayload = jwtDecode(token);
      const isExpired = isTokenExpired(decodedToken);
      if (isExpired) {
        console.log("Expired!");
        localStorage.removeItem(Config.JWT_TOKEN);
        router.navigateByUrl('/login');
      } else {
        const requestClone = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next(requestClone);
      }
    } catch {
      console.error('invalid Token')
    }
  } else
    router.navigateByUrl('login');

  return next(req);
};


function getJwtToken(): string | null {
  return localStorage.getItem('JWT_TOKEN')
}

function isTokenExpired(decodedToken: JwtPayload) {
  return decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false
}
