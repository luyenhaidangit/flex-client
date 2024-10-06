import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpApplicationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Kiểm tra nếu đường dẫn không có http hoặc https để thêm baseUrl vào
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `${environment.flexServer.apiUrl}${req.url}` });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
