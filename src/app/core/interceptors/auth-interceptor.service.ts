import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLoginService } from '@core/services/user-login.service';

@Injectable({
   providedIn: 'root'
 })
export class AuthInterceptorService implements HttpInterceptor {
   fingerprint: string;
   loggedOnUser: string;
   private renewing = false;
   //token = environment.tokenNAR;
   token: any;
   constructor(private router: Router, private inj: Injector, private _userLoginService: UserLoginService) {
   }

   private handleAuthError(err: HttpErrorResponse): Observable<any> {
      return Observable.throw(err);
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      try {
         if (req.url.match("nedbank2") || req.url.match("127.0.0.1:9202")) {
            // const nextReq = req.clone({
            //    headers: req.headers.set('Cache-Control', 'no-cache')
            //       .set('Pragma', 'no-cache')
            //       .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
            //       .set('If-Modified-Since', '0')
            // });

            return next.handle(req);
         }
         this.token = null;
         var tokenFromStorage = null;
         if (this._userLoginService.isLoggedIn()) {
            tokenFromStorage = localStorage.getItem('Authorization');
         } else {
            this._userLoginService.userLogin();
         }

         if (tokenFromStorage) {
            this.token = tokenFromStorage;
         }
         else {
            // Can default is we want to test e.g.:
            // this.token = environment.tokenNAR;
         }

         if (this.token) {
            req = req.clone({
               headers: req.headers.set('Authorization', 'Bearer' + ' ' + this.token)
            });
         }
         const headers = new HttpHeaders();
         headers.set('Content-Type', 'application/json; charset=utf-8');
         headers.set('Accept', 'application/json');

         if (!req.headers.has('Content-Type')) {
            req = req.clone({
               headers: req.headers.append('Content-Type', 'application/json')
            });
         }
         req = req.clone({
            headers: req.headers.set(
               'Cache-Control', 'no-cache'
            )
         });
         req = req.clone({
            headers: req.headers.set(
               'Pragma', 'no-cache'
            )
         });
         req = req.clone({
            headers: req.headers.set(
               'Expires', 'Sat, 01 Jan 2000 00:00:00 GMT'
            )
         });
         req = req.clone({
            headers: req.headers.set('accept', '*/*')
         });
         req = req.clone({
            headers: req.headers.set('accept', 'text/plain')
         });
         req = req.clone({
            headers: req.headers.set('accept', 'application/json')
         });

         return next.handle(req);
      } catch (e) {
         this.handleAuthError(e);
      }
   }

   decodeJwt(token: string) {
      return jwt_decode(token);
   }

   // loggedOnUserScopes() {
   //    return this.decodeJwt(this.token).scopes;
   // }
}
