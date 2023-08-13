import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddJwtHeaderIntreceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem("jwt");
    const modifiedRequest = request.clone({ setHeaders: { authorization: `Bearer ${jwt}`  } });
    // console.log(modifiedRequest.headers);
    return next.handle(modifiedRequest);
  }
}
