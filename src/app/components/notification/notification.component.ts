import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { NotificationType } from '../../models/notification'
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        AsyncPipe,
        NgForOf,
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
    notifications$: any;
    bootstrapNotificationTypeMap = new Map<NotificationType, string>([
        [NotificationType.success, 'alert-success'],
        [NotificationType.info, 'alert-info'],
        [NotificationType.warning, 'alert-warning'],
        [NotificationType.error, 'alert-danger']
    ])

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notifications$ = this.notificationService.notifications$
    }

    dismiss(id: number) {
        this.notificationService.removeNotification(id)
    }
}
