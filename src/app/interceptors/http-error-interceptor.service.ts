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
            catchError((e: HttpErrorResponse) => {
                let httpError: HttpError;

                if (e.status === 0) {
                    httpError = { type: 'Client-side', message: e.error.message }
                } else {
                    httpError = { type: 'Server-side', message: e.error.message, status: e.status }
                }

                const logMessage = `${httpError.type} error. Message: ${httpError.message}, error: `;

                if (httpError.status && httpError.status < 500) {
                    console.warn(logMessage, e)
                } else {
                    console.error(logMessage, e)
                }

                return throwError(() => httpError);
            })
        );
    }
}
