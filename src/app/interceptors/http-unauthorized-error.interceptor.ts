import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const httpUnauthorizedErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router)

    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            if (e.status === 401) {
                router.navigate(['/logout'])
            }

            return throwError(() => e)
        })
    )
}
