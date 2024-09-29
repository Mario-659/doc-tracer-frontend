import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notification } from '../models/notification'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    // TODO make multiple notifications at once
    notificationSubject = new BehaviorSubject<Notification | null>(null);

    constructor() {}

    /**
     * Shows notification
     *
     * @param notification
     * @param timeout - timeout in milliseconds
     */
    showNotification(notification: Notification, timeout: number = 15000) {
        this.notificationSubject.next(notification)

        setTimeout(() => {
            this.clearMessage()
        }, timeout)
    }

    private clearMessage() {
        this.notificationSubject.next(null)
    }
}
