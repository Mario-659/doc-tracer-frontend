import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from "../model/http-error";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let httpError: HttpError;

                if (error.status === 0) {
                    httpError = { type: 'Client-side', message: error.error.message }
                } else {
                    httpError = { type: 'Server-side', message: error.error.message, status: error.status }
                }

                console.error(`${httpError.type} error. Message: ${httpError.message}, error: ${error.error}`)
                return throwError(() => httpError);
            })
        );
    }
}
