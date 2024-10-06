import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AppNotification } from '../models/notification'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<AppNotification[]>([])
    public notifications$ = this.notificationsSubject.asObservable()

    showNotification(notification: AppNotification, timeout: number = 10000) {
        console.log('show notification called')
        console.log(this.notificationsSubject.getValue())
        const currentNotifications = this.notificationsSubject.getValue()
        this.notificationsSubject.next([...currentNotifications, notification])

        setTimeout(() => this.removeNotification(notification.id), timeout)
    }

    removeNotification(id: number) {
        const currentNotifications = this.notificationsSubject.getValue()
        const updatedNotifications = currentNotifications.filter((notification) => notification.id !== id)
        this.notificationsSubject.next(updatedNotifications)
    }
}
