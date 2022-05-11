import { ApiService } from './../../../shared/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apiService: ApiService,
  ) { }

  getAdminUser(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.ADMIN_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getCitizenUser(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.CITIZEN_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  saveCitizenUser(name: string, surname: string, dni: string, socialParams: any): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("name", name);
    httpParams = httpParams.append("surname", surname);
    httpParams = httpParams.append("dni", dni);
    httpParams = httpParams.append("socialParams", JSON.stringify(socialParams));
    return this.apiService.post(RequestEndpoints.CITIZEN_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  saveAdminUser(name: string, surname: string, dni: string): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("name", name);
    httpParams = httpParams.append("surname", surname);
    httpParams = httpParams.append("dni", dni);
    return this.apiService.post(RequestEndpoints.ADMIN_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  deleteCitizenUser(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.delete(RequestEndpoints.REGISTER_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  deleteAdminUser(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.delete(RequestEndpoints.REGISTER_ADMIN, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }
}
