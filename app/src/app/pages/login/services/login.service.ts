import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError,  } from 'rxjs/operators';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiService: ApiService,
  ) { }

  getLocalWallets(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.WALLETS, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  authenticateUser(wallet: string): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('account', wallet);
    return this.apiService.post(RequestEndpoints.AUTHENTICATE, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

}
