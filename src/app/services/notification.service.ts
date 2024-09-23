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

    showNotification(notification: Notification) {
        this.notificationSubject.next(notification)

        setTimeout(() => {
            this.clearMessage()
        }, 15000)
    }

    clearMessage() {
        this.notificationSubject.next(null)
    }
}
