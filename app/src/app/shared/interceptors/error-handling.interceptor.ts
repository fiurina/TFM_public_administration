import { ErrorHandlerService } from './error-handler.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Toast } from '@capacitor/toast';


@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  isLoading: boolean = false;

  constructor(
    private errorHandler: ErrorHandlerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequest(next, req);

  }

  handleRequest(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => this.requestErrorHandling(error))
    )
  }

  requestErrorHandling(error: HttpErrorResponse) {
    this.filterError(error)
    return throwError(error)
  }

  async filterError(error: HttpErrorResponse) {
    // console.log('Interceptor', error);

    let error_message = await this.errorHandler.showMessage(error);
    // await Toast.show({ text: error_message, duration: 'long', position: 'bottom' });
  }

}
