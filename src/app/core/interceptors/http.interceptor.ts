import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor as HttpSystemInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { ToastService } from 'angular-toastify';

import { LoaderService } from '../services/loader.service';
import { Header, HttpError } from '../enums/http.enum';

@Injectable()
export class HttpInterceptor implements HttpSystemInterceptor {
  constructor(private loadingService: LoaderService, private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set default baseurl
    if (!request.url.startsWith('http') && !request.url.startsWith('https')) {
      request = request.clone({ url: `${environment.flexServer.apiUrl}${request.url}` });
    }

    // Loading when call request
    if (!request.headers.has(Header.SkipLoading)) {
      this.loadingService.show();
    } else {
      request = request.clone({
        headers: request.headers.delete(Header.SkipLoading)
      });
    }
    
    return next.handle(request).pipe(
      catchError((error: any) => {
        // Handle case errors
        if (error.status === HttpError.ConnectionRefused) {
          this.toastService.error('Không thể kết nối đến máy chủ!');
        }

        return throwError(error);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
