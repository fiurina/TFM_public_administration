import { ApiService } from './../../../../shared/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialConsumerService {

  constructor(
    private apiService: ApiService,
  ) { }

  checkSocial(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.apiService.post(RequestEndpoints.SOCIAL_CHECK, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getSocialById(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.apiService.get(RequestEndpoints.SOCIAL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  recieveSocial(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.apiService.post(RequestEndpoints.SOCIAL_RECIEVE, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getAllSocial(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.SOCIALS, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }
}
