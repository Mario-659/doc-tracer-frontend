import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { NotificationService } from '../services/notification.service'
import { NotificationType } from '../models/notification'

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService)

    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            let httpError: { type: string; message: string; status?: number }

            if (e.status === 0) {
                httpError = { type: 'Client-side', message: e.error.message }
            } else {
                httpError = {
                    type: 'Server-side',
                    message: e.error.message,
                    status: e.status,
                }
            }

            const logMessage = `${httpError.type} error. Message: ${httpError.message}, error: `
            if (httpError.status && httpError.status < 500) {
                console.warn(logMessage, e)
            } else {
                console.error(logMessage, e)
            }

            let notificationMessage;
            if (httpError.type === 'Client-side' || !httpError.status) {
                 notificationMessage = 'Network issue occurred while connecting to server'
            } else if (httpError.status >= 400 && httpError.status < 500) {
                notificationMessage = httpError.message
            } else {
                notificationMessage = 'A server-side error occurred'
            }

            notificationService.showNotification({message: notificationMessage, type: NotificationType.error});

            return throwError(() => httpError)
        })
    )
}
