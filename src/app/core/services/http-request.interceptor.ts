import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AppStateService } from '../services/app-state.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private appStateService: AppStateService) {}

  // intercept http requests and toggle loading state
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appStateService.setLoading(true);

    const headers: any = {
      'Content-Type': 'application/json; charset=utf-8'
    };

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(
      finalize(() => this.appStateService.setLoading(false)),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    //todo do something with error
    console.error(error);
    return throwError(error);
  }
}
