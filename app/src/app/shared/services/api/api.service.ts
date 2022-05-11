import { Injectable } from '@angular/core';
import { TIMEOUT } from '../../config/constants/api.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, defer, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, params: HttpParams): Observable<any> {
    return this.http.get(url, { params: params }).pipe(timeout(TIMEOUT));
  }

  post(url: string, body: HttpParams): Observable<any> {
    return this.http.post(url, body).pipe(timeout(TIMEOUT));
  }

  put(url: string, body: HttpParams): Observable<any> {
    return this.http.put(url, body).pipe(timeout(TIMEOUT));
  }

  delete(url: string, params: HttpParams): Observable<any> {
    return this.http.delete(url, { params: params }).pipe(timeout(TIMEOUT));
  }

  uploadFile(url: string, file: FormData, params?: HttpParams): Observable<any> {
    return this.http.post(url, file, { params: params }).pipe(timeout(TIMEOUT));
  }
}
