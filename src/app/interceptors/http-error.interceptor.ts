import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            let httpError: { type: string, message: string, status?: number };

            if (e.status === 0) {
                httpError = { type: 'Client-side', message: e.error.message };
            } else {
                httpError = { type: 'Server-side', message: e.error.message, status: e.status };
            }

            const logMessage = `${httpError.type} error. Message: ${httpError.message}, error: `;

            if (httpError.status && httpError.status < 500) {
                console.warn(logMessage, e);
            } else {
                console.error(logMessage, e);
            }

            return throwError(() => httpError);
        })
    );
};
