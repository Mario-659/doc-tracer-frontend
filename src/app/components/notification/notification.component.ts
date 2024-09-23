import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Notification } from '../../models/notification'
import { NgClass, NgIf } from "@angular/common";

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [
        NgIf,
        NgClass
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
    notification: Notification | null = null

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        this.notificationService.notificationSubject.subscribe((notification) => (this.notification = notification))
    }
}
