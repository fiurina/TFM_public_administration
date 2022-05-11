import { ApiService } from './../../../../shared/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollAdministrationService {

  constructor(
    private apiService: ApiService,
  ) { }

  createPoll(title: string, description: string, imageURL: string, question: string, answers: Array<string>): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('title', title);
    httpParams = httpParams.append('description', description);
    httpParams = httpParams.append('imageURL', imageURL);
    httpParams = httpParams.append('question', question);
    httpParams = httpParams.append('answers', JSON.stringify(answers));
    return this.apiService.post(RequestEndpoints.POLL, httpParams).pipe(
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

  getPollById(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.apiService.get(RequestEndpoints.POLL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getTotalPolls(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.TOTAL_POLLS, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getPollResults(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    return this.apiService.get(RequestEndpoints.POLL_RESULTS, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  deletePoll(id: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);

    return this.apiService.delete(RequestEndpoints.POLL, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }
}
