import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { NotificationService } from '../services/notification.service'
import { inject } from '@angular/core'
import { AppNotification, NotificationType } from '../models/notification'

export const httpErrorNotificationInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService)

    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            let notificationMessage
            if (e.status === 0 || !e.status) {
                notificationMessage = 'Network issue occurred while connecting to server'
            } else if (e.status === 403) {
                notificationMessage = 'Authentication failed'
            } else if (e.error.message && e.status >= 400 && e.status < 500) {
                notificationMessage = e.error.message
            }

            if (notificationMessage) {
                notificationService.showNotification(new AppNotification(notificationMessage, NotificationType.error))
            }

            return throwError(() => e)
        })
    )
}
