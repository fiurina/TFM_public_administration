import { ApiService } from './../../../../shared/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialAdministrationService {

  constructor(
    private apiService: ApiService,
  ) { }

  createSocialAid(title: string, description: string, tokens: number, imageURL: string, conditionType: number, minRange: number, maxRange: number, param: string): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('title', title);
    httpParams = httpParams.append('description', description);
    httpParams = httpParams.append('tokens', tokens);
    httpParams = httpParams.append('imageURL', imageURL);
    httpParams = httpParams.append('conditionType', conditionType);
    httpParams = httpParams.append('minRange', minRange);
    httpParams = httpParams.append('maxRange', maxRange);
    httpParams = httpParams.append('param', param);

    return this.apiService.post(RequestEndpoints.SOCIAL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  uploadImageIPFS(image: File): Observable<any>{
    let formData = new FormData();
    formData.append('file', image, image.name);
    return this.apiService.uploadFile(RequestEndpoints.UPLOAD_IPFS, formData).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getTotalSocials(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.TOTAL_SOCIAL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getContractBalance(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.CONTRACT, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  sendTokens(tokens: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('tokens', tokens*10000000000000000000);

    return this.apiService.post(RequestEndpoints.CONTRACT, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  deleteSocial(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);

    return this.apiService.delete(RequestEndpoints.SOCIAL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

}
