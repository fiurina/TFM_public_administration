import { ApiService } from './../../../../shared/services/api/api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollConsumerService {

  constructor(
    private apiService: ApiService,
  ) { }

  answerPoll(id: number, option: number): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id);
    httpParams = httpParams.append('optionSelected', option);
    return this.apiService.post(RequestEndpoints.POLL_ANSWER, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }

  getAllPolls(): Observable<any>{
    let httpParams = new HttpParams();
    return this.apiService.get(RequestEndpoints.POLLS, httpParams).pipe(
      map(async (data: any) => {return data;}),
      catchError(error => throwError(error)));
  }
}
