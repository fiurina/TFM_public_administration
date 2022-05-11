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
export class RegisterService {

  constructor(
    private apiService: ApiService,
  ) { }

  getTotalAdminUsers(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.REGISTER_ADMIN, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  registerAdminUser(name: string, surname: string, dni: string, wallet: string): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("name", name);
    httpParams = httpParams.append("surname", surname);
    httpParams = httpParams.append("dni", dni);
    httpParams = httpParams.append("account", wallet);
    return this.apiService.post(RequestEndpoints.REGISTER_ADMIN, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getTotalUsers(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.REGISTER_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  registerUser(name: string, surname: string, dni: string, gender: string, salary: string, age: number, wallet: string): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("name", name);
    httpParams = httpParams.append("surname", surname);
    httpParams = httpParams.append("dni", dni);
    httpParams = httpParams.append("gender", gender);
    httpParams = httpParams.append("salary", salary);
    httpParams = httpParams.append("age", age);
    httpParams = httpParams.append("account", wallet);
    return this.apiService.post(RequestEndpoints.REGISTER_USER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }
}
