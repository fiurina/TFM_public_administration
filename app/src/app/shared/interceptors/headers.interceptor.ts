import { UserSession } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  interceptorLoader: any;

  constructor(
    private authService: AuthService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getUserData()).pipe(
      mergeMap((data: boolean) => {
        let headers = new HttpHeaders();
        if(!req.url.split('/').includes('upload-ipfs')){
          headers = headers.append('Content-Type', req.method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded');
        }
        headers = headers.append('Authorization', 'Bearer ' + this.authService.userSession.tokenJWT);
        const authReq = req.clone({ withCredentials: true, headers })
        return this.handleRequest(next, authReq);
      })
    )
  }

  handleRequest(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event)
    )
  }
}